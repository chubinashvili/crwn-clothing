import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAkZMfGsHYONL9pwW4_wDFCAsGrPFFApps",
    authDomain: "db-crwn-clothing-app.firebaseapp.com",
    projectId: "db-crwn-clothing-app",
    storageBucket: "db-crwn-clothing-app.appspot.com",
    messagingSenderId: "629944648345",
    appId: "1:629944648345:web:f6df517b5ba4274f3eee08",
    measurementId: "G-1JE5NH903F"
};
  

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (e) {
      console.log('error creating the user', e);
    }
  }
  return userDocRef;
}