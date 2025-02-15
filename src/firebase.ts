// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAhKp3feUmSWtEqlQ4YgP5jfrODuE4Rfjg',
  authDomain: 'gftd-v1.firebaseapp.com',
  projectId: 'gftd-v1',
  storageBucket: 'gftd-v1.firebasestorage.app',
  messagingSenderId: '1073412921952',
  appId: '1:1073412921952:web:1c0d7f46c1fa78cfc88105',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
