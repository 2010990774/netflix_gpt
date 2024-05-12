// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJopwHQ0w4V0g0T_Qom_kFM7L6KX42XlI",
    authDomain: "netflixgpt-96130.firebaseapp.com",
    projectId: "netflixgpt-96130",
    storageBucket: "netflixgpt-96130.appspot.com",
    messagingSenderId: "222415849218",
    appId: "1:222415849218:web:b63e64fe2573c39fe7e41b",
    measurementId: "G-9PJ1MVKN1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();