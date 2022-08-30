import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";

// const firebaseConfig = {

// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// console.log(auth);
// createUserWithEmailAndPassword(auth, "another@gmail.com", "testpass123")
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     return user;
//     // ...
//   })
//   .then((user) =>
//     user
//       .getIdToken(true)
//       .then(function (idToken) {
//         console.log(idToken);
//       })
//       .catch(function (error) {
//         // Handle error
//       })
//   )
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// signInWithEmailAndPassword(auth, "test@gmail.com", "testpass123")
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     return user;
//     // ...
//   })
//   .then((user) =>
//     user
//       .getIdToken(true)
//       .then(function (idToken) {
//         console.log(idToken);
//       })
//       .catch(function (error) {
//         // Handle error
//       })
//   )
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
