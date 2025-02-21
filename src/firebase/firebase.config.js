// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKp7w2a6ZHN1pTj7GkBDUiN67sUB7SLqU",
  authDomain: "task-management-debf9.firebaseapp.com",
  projectId: "task-management-debf9",
  storageBucket: "task-management-debf9.firebasestorage.app",
  messagingSenderId: "510358345578",
  appId: "1:510358345578:web:deb437a87bad0dd1e8b713"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app