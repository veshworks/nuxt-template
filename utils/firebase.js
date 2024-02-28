// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBbSfi0TiGSA8FCH5tRKCKIHT9vGOgkSjA',
  authDomain: 'tormenta-palace.firebaseapp.com',
  projectId: 'tormenta-palace',
  storageBucket: 'tormenta-palace.appspot.com',
  messagingSenderId: '67691212367',
  appId: '1:67691212367:web:c3190d89a6db679b2d043a',
  measurementId: 'G-WMFWKDG4S0',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseApp);
