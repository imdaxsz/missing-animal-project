import React, { useState } from "react";
import HeaderPresenter from "./HeaderPresenter";
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
      })
      .catch((error) => {
        // An error happened.
      });
      setIsLogin("logout");
    a;
  }
  function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        setIsLogin("login");
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
