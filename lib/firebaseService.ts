import { auth, db, storage } from './firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    UserCredential
} from 'firebase/auth';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    DocumentData,
    Timestamp,
    onSnapshot
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { ProjectInput } from './sharedProjectTypes';

// Helper to map Firestore docs to data with ID
// Note: Firestore automatically creates collections when you add documents to them.
const mapDoc = (doc: any) => ({ id: doc.id, ...doc.data() });

// ============================================
// AUTH SERVICES
// ============================================

export const authService = {
    signUp: (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password),
    signIn: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),
    signOut: () => signOut(auth),
    onAuthStateChanged: (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback),
    getCurrentUser: () => auth.currentUser
};

// ============================================
// FIRESTORE BASE SERVICES
// ============================================

export const firestoreService = {
    // This function automatically creates the collection if it doesn't exist
    addDocument: async (collectionName: string, data: DocumentData) => {
        try {
            // Adding a document implicitly 'creates' the collection
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
            return { success: true, id: docRef.id, data: { id: docRef.id, ...data } };
        } catch (error: any) {
            console.error(`Error adding to ${collectionName}:`, error);
            return { success: false, error: error.message };
        }
    },

    getAllDocuments: async (collectionName: string, sortField = 'created_at') => {
        try {
            const q = query(collection(db, collectionName), orderBy(sortField, 'desc'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(mapDoc);
            return { success: true, data };
        } catch (error: any) {
            // If collection doesn't exist, it returns empty array, which is fine
            console.error(`Error getting ${collectionName}:`, error);
            return { success: false, error: error.message };
        }
    },

    subscribeToDocuments: (collectionName: string, callback: (data: any[]) => void, sortField = 'created_at') => {
        const q = query(collection(db, collectionName), orderBy(sortField, 'desc'));
        return onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(mapDoc);
            callback(data);
        });
    },

    getDocument: async (collectionName: string, id: string) => {
        try {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { success: true, data: mapDoc(docSnap) };
            }
            return { success: false, error: 'Document not found' };
        } catch (error: any) {
            console.error(`Error getting ${collectionName} ${id}:`, error);
            return { success: false, error: error.message };
        }
    },

    updateDocument: async (collectionName: string, id: string, data: any) => {
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, { ...data, updated_at: new Date().toISOString() });
            return { success: true, data: { id, ...data } };
        } catch (error: any) {
            console.error(`Error updating ${collectionName} ${id}:`, error);
            return { success: false, error: error.message };
        }
    },

    deleteDocument: async (collectionName: string, id: string) => {
        try {
            await deleteDoc(doc(db, collectionName, id));
            return { success: true };
        } catch (error: any) {
            console.error(`Error deleting ${collectionName} ${id}:`, error);
            return { success: false, error: error.message };
        }
    }
};

// ============================================
// DOMAIN SERVICES
// ============================================

// Helper to convert CamelCase ProjectInput to SnakeCase for compatibility
const mapProjectToSnakeCase = (input: ProjectInput) => ({
    user_id: input.userId,
    name: input.name,
    project_type: input.type,
    status: 'Lead',
    property_address: input.property.address,
    property_city: input.property.city,
    property_state: input.property.state,
    property_zip: input.property.zip,
    property: input.property,
    insurance: input.insurance,
    organization: input.organization,
    billing: input.billing,
    details: input.details,
});

export const projectService = {
    getAll: () => firestoreService.getAllDocuments('project'),
    subscribe: (callback: (data: any[]) => void) => firestoreService.subscribeToDocuments('project', callback),
    getById: (id: string) => firestoreService.getDocument('project', id),

    // Creates Project and related sub-collections automatically
    createFullProject: async (input: ProjectInput) => {
        try {
            // Remove undefined values which Firestore doesn't support
            const projectData = JSON.parse(JSON.stringify(mapProjectToSnakeCase(input)));

            // AUTO-CREATES 'projects' collection if missing
            const projectResult = await firestoreService.addDocument('project', projectData);
            if (!projectResult.success) throw new Error(projectResult.error);
            const projectId = projectResult.id;

            if (input.contacts && input.contacts.length > 0) {
                const contactPromises = input.contacts.map(contact =>
                    // AUTO-CREATES 'contacts' collection if missing
                    firestoreService.addDocument('contacts', {
                        project_id: projectId,
                        first_name: contact.firstName,
                        last_name: contact.lastName,
                        email: contact.email,
                        phone: contact.phone,
                        role: contact.role,
                        is_primary: contact.isPrimary,
                    })
                );
                await Promise.all(contactPromises);
            }

            return { success: true, projectId };
        } catch (error: any) {
            console.error('Error creating full project:', error);
            return { success: false, error: error.message };
        }
    },

    getFullProject: async (id: string) => {
        try {
            const projectRes = await firestoreService.getDocument('project', id);
            if (!projectRes.success) throw new Error(projectRes.error);
            const project = projectRes.data;

            const contactsQ = query(collection(db, 'contacts'), where('project_id', '==', id));
            const estimatesQ = query(collection(db, 'estimates'), where('project_id', '==', id));

            const [contactsSnap, estimatesSnap] = await Promise.all([getDocs(contactsQ), getDocs(estimatesQ)]);

            const contacts = contactsSnap.docs.map(mapDoc);
            const estimates = estimatesSnap.docs.map(mapDoc);

            return {
                success: true,
                data: {
                    ...project,
                    contacts,
                    estimates
                }
            };
        } catch (error: any) {
            console.error('Error getting full project:', error);
            return { success: false, error: error.message };
        }
    }
};

export const contactService = {
    getAll: () => firestoreService.getAllDocuments('contacts'),
    getByProjectId: async (projectId: string) => {
        try {
            const q = query(collection(db, 'contacts'), where('project_id', '==', projectId));
            const snapshot = await getDocs(q);
            return { success: true, data: snapshot.docs.map(mapDoc) };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },
    create: (data: any) => firestoreService.addDocument('contacts', data),
    update: (id: string, data: any) => firestoreService.updateDocument('contacts', id, data),
    delete: (id: string) => firestoreService.deleteDocument('contacts', id)
};

export const estimateService = {
    getAll: () => firestoreService.getAllDocuments('estimates'),
    getByProjectId: async (projectId: string) => {
        try {
            const q = query(collection(db, 'estimates'), where('project_id', '==', projectId));
            const snapshot = await getDocs(q);
            return { success: true, data: snapshot.docs.map(mapDoc) };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },
    create: (data: any) => firestoreService.addDocument('estimates', data),
    update: (id: string, data: any) => firestoreService.updateDocument('estimates', id, data),
    delete: (id: string) => firestoreService.deleteDocument('estimates', id)
};

export const userService = {
    getAll: () => firestoreService.getAllDocuments('users'),
    create: (data: any) => firestoreService.addDocument('users', data),
    update: (id: string, data: any) => firestoreService.updateDocument('users', id, data),
    delete: (id: string) => firestoreService.deleteDocument('users', id)
};

export const dashboardService = {
    getStats: async () => {
        try {
            const [projects, contacts, estimates] = await Promise.all([
                getDocs(collection(db, 'project')),
                getDocs(collection(db, 'contacts')),
                getDocs(collection(db, 'estimates'))
            ]);
            return {
                success: true,
                data: {
                    total_projects: projects.size,
                    total_contacts: contacts.size,
                    total_estimates: estimates.size,
                    total_revenue: 0
                }
            };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    },
    getRecentActivity: async (limitCount = 10) => {
        try {
            const q = query(collection(db, 'project'), orderBy('created_at', 'desc'), limit(limitCount));
            const snap = await getDocs(q);
            const activities = snap.docs.map(d => ({
                id: d.id,
                type: 'project_created',
                description: `Project ${d.data().name || 'Unknown'} created`,
                created_at: d.data().created_at
            }));
            return { success: true, data: activities };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
};

export const searchService = {
    searchProjects: async (term: string) => {
        try {
            const q = query(
                collection(db, 'project'),
                where('name', '>=', term),
                where('name', '<=', term + '\uf8ff')
            );
            const snap = await getDocs(q);
            return { success: true, data: snap.docs.map(mapDoc) };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
};

export const storageService = {
    uploadFile: async (file: File, path: string) => {
        try {
            const storageRef = ref(storage, path);
            const snapshot = await uploadBytes(storageRef, file);
            const url = await getDownloadURL(snapshot.ref);
            return { success: true, url, path: snapshot.ref.fullPath };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
};

export const customerService = {
    getAllCustomers: () => contactService.getAll(),
    addCustomer: (data: any) => contactService.create(data),
};
