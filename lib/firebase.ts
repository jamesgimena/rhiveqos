import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Firebase Configuration using Environment Variables
// Firestore automatically creates collections when data is added.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const isMissingConfig = !firebaseConfig.apiKey || !firebaseConfig.projectId;

if (isMissingConfig) {
    console.warn(
        '[RHIVE] Firebase env vars not set. Create a .env file with your VITE_FIREBASE_* keys. ' +
        'The app will run in offline/demo mode.'
    );
}

// Initialize Firebase (safely)
let app: FirebaseApp;
let analytics: Analytics | null = null;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
    app = initializeApp(firebaseConfig);

    // Analytics only works in browser environment
    if (typeof window !== 'undefined' && !isMissingConfig) {
        try { analytics = getAnalytics(app); } catch { /* analytics optional */ }
    }

    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
} catch (e) {
    console.error('[RHIVE] Firebase initialization failed. Check your .env file.', e);
    // Initialize with a dummy app so imports don't break
    app = initializeApp({ apiKey: 'MISSING', projectId: 'rhive-demo' }, 'demo');
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}

// Export initialized services
export { app, analytics, auth, db, storage };

