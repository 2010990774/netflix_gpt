// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJopwHQ0w4V0g0T_Qom_kFM7L6KX42XlI",
  authDomain: "netflixgpt-96130.firebaseapp.com",
  projectId: "netflixgpt-96130",
  storageBucket: "netflixgpt-96130.appspot.com",
  messagingSenderId: "222415849218",
  appId: "1:222415849218:web:b63e64fe2573c39fe7e41b",
  measurementId: "G-9PJ1MVKN1V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
