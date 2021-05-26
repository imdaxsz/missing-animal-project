import React, { useState, useEffect } from "react";
import HeaderPresenter from "./HeaderPresenter";
import firebase from "firebase";
import { connect } from "react-redux";

function HeaderContainer(props) {
  const [mode, setMode] = useState("close");
  const [isLogin, setIsLogin] = useState("logout");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("google auth 호출되었음");
      if (user) {
        console.log("로그인됨");
        props.dispatch({ type: "setUserLogin", payload: user });
      } else {
        console.log("로그인안됨");
        props.dispatch({ type: "setUserLogout" });
      }  
    });
  },[]);
  useEffect(()=>{
    setIsLogin(props.state['isLogin'])
  },[props.state])
  
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
        // Sign-out successful.\
        
      })
      .catch((error) => {
        // An error happened.
      });
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
        console.log(errorCode, "dsads", errorMessage);
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
function stateToProps(state) {
  return {
    state: state,
  };
}

export default connect(stateToProps)(HeaderContainer);
