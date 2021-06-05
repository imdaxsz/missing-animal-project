import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";
import { Provider } from "react-redux";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

var firebaseConfig = {
  apiKey: "AIzaSyCu2WRIIfu_o3-aHCoNWv6SJ1qnlbsS-Ic",
  authDomain: "missing-animal-project.firebaseapp.com",
  databaseURL: "https://missing-animal-project-default-rtdb.firebaseio.com",
  projectId: "missing-animal-project",
  storageBucket: "missing-animal-project.appspot.com",
  messagingSenderId: "327509368295",
  appId: "1:327509368295:web:ba84aeeede3a63d70ef142",
  measurementId: "G-70N5H0RJKV",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
