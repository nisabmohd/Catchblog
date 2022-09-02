import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqNNd0VDZZX810h2fyzYkanbCSRt88kdU",
  authDomain: "catchblog-dfb92.firebaseapp.com",
  projectId: "catchblog-dfb92",
  storageBucket: "catchblog-dfb92.appspot.com",
  messagingSenderId: "85445969941",
  appId: "1:85445969941:web:2ee890bf11c932f453e61c"
};
export const provider = new GoogleAuthProvider();
export const app = initializeApp(firebaseConfig);