// Firebase Realtime Service & Offline Fallback Layer for Saiyam Classes LMS

let db = null;
let auth = null;

// Dynamic import or initialization helper
export async function initFirebase() {
  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    const { getAuth } = await import('firebase/auth');

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoSaiyamClassesKey2026",
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "saiyam-classes-lms.firebaseapp.com",
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "saiyam-classes-lms",
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "saiyam-classes-lms.appspot.com",
      messagingSenderId: "987654321012",
      appId: "1:987654321012:web:saiyamlms2026"
    };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
    return { app, db, auth };
  } catch (e) {
    console.log("Operating in local persistent offline mode:", e.message);
    return { app: null, db: null, auth: null };
  }
}

export function isFirebaseConnected() {
  return db !== null;
}
