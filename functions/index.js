const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GoogleGenAI } = require('@google/genai');
const axios = require('axios');

admin.initializeApp();

// Configuration
const JUSTCALL_API_KEY = process.env.JUSTCALL_API_KEY;
const JUSTCALL_API_SECRET = process.env.JUSTCALL_API_SECRET;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenAI(GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * 1. JustCall Lookup (For AI Agent)
 * JustCall hits this to get details about a caller in real-time.
 */
exports.justCallLookup = functions.https.onRequest(async (req, res) => {
    const phoneNumber = req.query.phone || req.body.phone;
    if (!phoneNumber) return res.status(400).send({ error: "No phone number" });

    try {
        const db = admin.firestore();

        // 1. Search Contacts
        const contactSnapshot = await db.collection('contacts').where('phone', '==', phoneNumber).limit(1).get();
        let customerData = null;
        let contactId = null;

        if (!contactSnapshot.empty) {
            customerData = contactSnapshot.docs[0].data();
            contactId = contactSnapshot.docs[0].id;
        }

        // 2. Search Projects (Check both 'project' and 'projects' as per user notes)
        let projectData = null;
        if (customerData && customerData.project_id) {
            const pDoc = await db.collection('project').doc(customerData.project_id).get();
            if (pDoc.exists) projectData = pDoc.data();
            else {
                const pDoc2 = await db.collection('projects').doc(customerData.project_id).get();
                if (pDoc2.exists) projectData = pDoc2.data();
            }
        }

        // 3. Prepare context for Gemini
        const customerName = customerData ? `${customerData.first_name} ${customerData.last_name}` : "Unknown (New Lead)";
        const customerStatus = projectData ? projectData.status : (customerData ? customerData.status : "New");
        const lastProject = projectData ? (projectData.name || "Untitled Project") : (customerData ? (customerData.last_project || "None") : "None");

        const prompt = `You are the AI Voice Agent for RHIVE Construction. 
        Customer: ${customerName}, 
        Status: ${customerStatus}, 
        Current Project: ${lastProject}. 
        Generate a brief (max 15 words) personalized greeting. 
        Format: Just the text.`;

        let personalizedGreeting = `Hello, thanks for calling RHIVE Construction. How can I help you?`;
        if (GEMINI_API_KEY) {
            try {
                const result = await model.generateContent(prompt);
                personalizedGreeting = result.response.text().trim().replace(/["]+/g, '');
            } catch (e) { console.error("Gemini Error", e); }
        }

        return res.status(200).json({
            found: !!customerData,
            firstName: customerData ? customerData.first_name : "Guest",
            lastName: customerData ? customerData.last_name : "",
            personalizedGreeting,
            status: customerStatus,
            lastProject,
            projectId: customerData ? customerData.project_id : null
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

/**
 * 1b. JustCall Information Query (Enhanced)
 * A more detailed endpoint for JustCall bots to fetch full project/property details.
 */
exports.justCallInformation = functions.https.onRequest(async (req, res) => {
    const phoneNumber = req.query.phone || req.body.phone;
    if (!phoneNumber) return res.status(400).send({ error: "No phone number" });

    try {
        const db = admin.firestore();

        // 1. Fetch Contact
        const contactSnapshot = await db.collection('contacts').where('phone', '==', phoneNumber).limit(1).get();
        if (contactSnapshot.empty) {
            return res.status(200).json({ found: false, message: "No contact found for this number." });
        }

        const contact = { id: contactSnapshot.docs[0].id, ...contactSnapshot.docs[0].data() };

        // 2. Fetch Project(s)
        let projects = [];
        if (contact.project_id) {
            const p1 = await db.collection('project').doc(contact.project_id).get();
            if (p1.exists) projects.push({ id: p1.id, ...p1.data() });

            const p2 = await db.collection('projects').doc(contact.project_id).get();
            if (p2.exists) projects.push({ id: p2.id, ...p2.data() });
        } else {
            // Search by contact ID in case project_id isn't on contact but contact_id is on project
            const q1 = await db.collection('project').where('contact_id', '==', contact.id).get();
            q1.forEach(doc => projects.push({ id: doc.id, ...doc.data() }));

            const q2 = await db.collection('projects').where('contact_id', '==', contact.id).get();
            q2.forEach(doc => projects.push({ id: doc.id, ...doc.data() }));
        }

        // 3. Fetch Property Details (if exists as a separate collection)
        let propertiesList = [];
        for (const proj of projects) {
            if (proj.property_id) {
                const propDoc = await db.collection('properties').doc(proj.property_id).get();
                if (propDoc.exists) propertiesList.push({ id: propDoc.id, ...propDoc.data() });
            }
            // Also check if property info is nested in project
            if (proj.property && !propertiesList.some(p => p.address === proj.property.address)) {
                propertiesList.push(proj.property);
            }
        }

        // 4. Summarize for AI Bot
        const contextSummary = `
            Customer: ${contact.first_name} ${contact.last_name}
            Email: ${contact.email || 'N/A'}
            Projects: ${projects.map(p => `${p.name} (Status: ${p.status || 'Unknown'})`).join(', ') || 'None'}
            Properties: ${propertiesList.map(p => p.address || p.property_address || 'Unknown').join(', ') || 'None'}
        `.trim();

        return res.status(200).json({
            found: true,
            contact,
            projects,
            properties: propertiesList,
            contextSummary
        });
    } catch (error) {
        console.error("JustCall Info Error:", error);
        return res.status(500).send(error.message);
    }
});

/**
 * 2. Sync Firebase -> JustCall
 * Automatically adds contacts to JustCall when created in Firebase.
 */
exports.onContactCreatedSyncToJustCall = functions.firestore
    .document('contacts/{contactId}')
    .onCreate(async (snapshot, context) => {
        const data = snapshot.data();

        if (!JUSTCALL_API_KEY || !JUSTCALL_API_SECRET) {
            console.error("JustCall API Keys not set in environment.");
            return null;
        }

        try {
            await axios.post('https://api.justcall.io/v1/contacts', {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email || ""
            }, {
                headers: {
                    'Authorization': `${JUSTCALL_API_KEY}:${JUSTCALL_API_SECRET}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Successfully synced ${data.first_name} to JustCall.`);
        } catch (error) {
            console.error("Error syncing to JustCall:", error.response?.data || error.message);
        }
    });

/**
 * 3. JustCall -> Firebase (Call Logging)
 * Receives webhook from JustCall when a call ends and logs it.
 */
exports.justCallWebhook = functions.https.onRequest(async (req, res) => {
    // JustCall sends data in the body
    const body = req.body;

    if (body.event === 'call.finished') {
        const callData = {
            from: body.from,
            to: body.to,
            duration: body.duration,
            direction: body.direction,
            recording_url: body.recording_url,
            transcript: body.transcript || "",
            timestamp: admin.firestore.FieldValue.serverTimestamp()
        };

        try {
            await admin.firestore().collection('call_logs').add(callData);
            return res.status(200).send("Call logged successfully");
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }

    res.status(200).send("Event received but not processed.");
});

