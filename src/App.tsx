import React from 'react';
import {
  RecoilRoot
} from 'recoil';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Productos from './components/Productos/Productos';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_t0B8PGrB2hGTmDvj5z3X5Y38VvdaYHE",
  authDomain: "prueba-muncher.firebaseapp.com",
  projectId: "prueba-muncher",
  storageBucket: "prueba-muncher.appspot.com",
  messagingSenderId: "862051320432",
  appId: "1:862051320432:web:01cce8ccfee6bcef526ab5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

function App() {
  return (
    <RecoilRoot>
      <Productos />
    </RecoilRoot>
  );
}

export default App;
