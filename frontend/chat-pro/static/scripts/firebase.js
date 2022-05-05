// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth, createUserWithEmailAndPassword
    , signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHtijBmRJAe9AAr_GV0M453dN0c6hbztk",
    authDomain: "chat-sprin-2.firebaseapp.com",
    projectId: "chat-sprin-2",
    storageBucket: "chat-sprin-2.appspot.com",
    messagingSenderId: "786971283756",
    appId: "1:786971283756:web:3a4c0ab0085046fec91c89"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const createUser = async (email, password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });

    return response;
}

const logIn = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });
    return result;
}

const logInGoogle = async () => {
    
   const result = await signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return {error:false,data:user};
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return {error:true,data:error};
  });

  return result;
}

export { createUser, logIn, logInGoogle}