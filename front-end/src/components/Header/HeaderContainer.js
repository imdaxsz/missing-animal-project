import React, { useState } from "react";
import HeaderPresenter from "./HeaderPresenter";
import firebase from "firebase";

function HeaderContainer() {
  const [mode, setMode] = useState("close");
  const [isLogin, setIsLogin] = useState("logout");

  function switchMode() {
    if (mode === "open") {
      setMode("close");
    } else {
      setMode("open");
    }
  }
  function googleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setIsLogin("logout");
      })
      .catch((error) => {
        // An error happened.
      });

    a;
  }
  function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
      prompt: "select_account",
    });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setIsLogin("login");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode , "dsads",errorMessage)
      });
  }

  return (
    <div>
      <HeaderPresenter
        mode={mode}
        switchMode={switchMode}
        isLogin={isLogin}
        googleLogin={googleLogin}
        googleLogout={googleLogout}
      ></HeaderPresenter>
    </div>
  );
}

export default HeaderContainer;
