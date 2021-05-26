import React, { useState, useEffect } from "react";
import HeaderPresenter from "./HeaderPresenter";
import firebase from "firebase";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import state from "../../store";

function HeaderContainer() {
  const [mode, setMode] = useState("close");

  const [userInfo, setUserInfo] = useRecoilState(state["userState"]);
  const [isLogin, setIsLogin] = useRecoilState(state["loginState"]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log();
    firebase.auth().onAuthStateChanged((user) => {
      setFlag(false);
      console.log("google auth 호출되었음");
      if (user) {
        console.log("로그인됨");
        const userObj = {
          email: user.email,
          image: user.photoURL,
          name: user.displayName,
        };
        setUserInfo(userObj);
        setIsLogin("login");
      } else {
        console.log("로그인안됨");
        const initUserState = {
          email: "test@test.com",
          image: "tempURL",
          name: "name",
        };
        setUserInfo(initUserState);
        setIsLogin("logout");
      }
      setFlag(true);
    });
  }, []);
  // 결과는 아래의 hook에서 조회 가능한듯
  useEffect(() => {
    if (flag === true) {
      console.log(userInfo, isLogin);
    }
  }, [flag]);

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
export default HeaderContainer;
