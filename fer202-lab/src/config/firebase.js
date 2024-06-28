// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNHofqcPbmMauEUEtWDt6eMrYarl3p9xI",
  authDomain: "orchids-c6992.firebaseapp.com",
  projectId: "orchids-c6992",
  storageBucket: "orchids-c6992.appspot.com",
  messagingSenderId: "404044871739",
  appId: "1:404044871739:web:f6ded57d78b2a6a373841e",
  measurementId: "G-FCMMLVF54F"
};

let app, analytics, auth, googleProvider;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
}

export { auth, googleProvider };
