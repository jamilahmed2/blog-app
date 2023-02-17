import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_Z35R4iK0khn-94VliAPQDyurgTUoHLg",
  authDomain: "blog-app-bef54.firebaseapp.com",
  projectId: "blog-app-bef54",
  storageBucket: "blog-app-bef54.appspot.com",
  messagingSenderId: "1043798010062",
  appId: "1:1043798010062:web:1d225edce19cb7b272889f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
