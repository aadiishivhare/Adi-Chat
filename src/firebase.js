import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCznDxWoHkBwMWG0_26iDbQma87YjiigoI",
    authDomain: "chit-chat-adi19.firebaseapp.com",
    projectId: "chit-chat-adi19",
    storageBucket: "chit-chat-adi19.appspot.com",
    messagingSenderId: "639240381405",
    appId: "1:639240381405:web:3c62fe2ab167c2acbe4c34"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()