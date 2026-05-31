import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, browserLocalPersistence, browserPopupRedirectResolver, getAuth, initializeAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId
);

const app: FirebaseApp | null = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

const createAuth = (): Auth | null => {
  if (!app) return null;
  try {
    return initializeAuth(app, {
      persistence: [browserLocalPersistence],
      popupRedirectResolver: browserPopupRedirectResolver
    });
  } catch (caught) {
    const code = (caught as { code?: string })?.code;
    if (code === "auth/already-initialized") {
      return getAuth(app);
    }
    throw caught;
  }
};

export const auth: Auth | null = createAuth();
export const db: Firestore | null = app ? getFirestore(app) : null;
