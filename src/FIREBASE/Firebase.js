import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBbDEL0jRdGhL8Hpg9fD2EN4dJcGbtjPPU",
  authDomain: "fir-auth-77a09.firebaseapp.com",
  projectId: "fir-auth-77a09",
  storageBucket: "fir-auth-77a09.firebasestorage.app",
  messagingSenderId: "839207363188",
  appId: "1:839207363188:web:55d589d8427984be08a721"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Auth
export const auth = getAuth(app)


