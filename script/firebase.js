// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"

// Your web app's Firebase configuration
// <--------don't change any codes in this for this project!!!---------->
const firebaseConfig = {
    apiKey: "AIzaSyBD9cV6a2NLLYofn1tqXReSUn2lvU1wFxM",
    authDomain: "register-auth-9bddd.firebaseapp.com",
    projectId: "register-auth-9bddd",
    storageBucket: "register-auth-9bddd.appspot.com",
    messagingSenderId: "1042066208530",
    appId: "1:1042066208530:web:b5cd485bfd59bb2de8a5cb"
};

// Initialize Firebase
const jsApp = initializeApp(firebaseConfig);

//Auth
const jsAuth = new getAuth(jsApp)
const jsGoogleAuthProvider = new GoogleAuthProvider()

//here creating an auth function for google provider
const signInWithPopupGoogleProvider = async () =>
await signInWithPopup(jsAuth, jsGoogleAuthProvider)

//Auth for email and password
const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(jsAuth, email, password)
}

// Initialize Cloud Firestore and get a reference to the service
const jsDb = getFirestore(jsApp)

const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(jsDb, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef)

    console.log(userSnapShot)
    console.log(userSnapShot.exists())

    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            })
        } catch (error) {
            console.log(error)
        }
    }

    return userDocRef
}

export { jsApp, signInWithPopupGoogleProvider, createUserDocFromAuth, createAuthUserWithEmailAndPassword }