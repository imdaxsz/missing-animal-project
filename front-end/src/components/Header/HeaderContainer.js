import React, { useState, useEffect } from "react";
import HeaderPresenter from "./HeaderPresenter";
import firebase from "firebase";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import axios from 'axios'
import ip from "../../ipConfig.json";
import state from "../../store";

function HeaderContainer() {
  const [mode, setMode] = useState("close");

  const [userInfo, setUserInfo] = useRecoilState(state["userState"]);
  const [isLogin, setIsLogin] = useRecoilState(state["loginState"]);
  const [flag, setFlag] = useState(false);
  const [admin , setAdmin] = useState(false);
  useEffect(() => {
    console.log();
    firebase.auth().onAuthStateChanged((user) => {
      setFlag(false);
      console.log("google auth 호출되었음");
      if (user) {
        console.log("로그인됨");
        console.log(user)
        const userObj = {
          email: user.email,
          image: user.photoURL,
          name: user.displayName,
          uid:user.uid
        };
        setUserInfo(userObj);
        setIsLogin("login");
        if(userObj.uid === "fdUjeM0aFTZ4ZbhknGekouICQOt1"){
          setAdmin(true)
        }
        else{
          setAdmin(false)
        }
      } else {
        console.log("로그인안됨");
        const initUserState = {
          email: "로그인하세요",
          image: "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png",
          name: "로그인하세요",
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
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }
  function crawl(){
    axios
    .get(ip['ip']+"/crawl")
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("보호소 정보 크롤링 완료");
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("데이터 로드 실패");
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
        console.log(errorCode, "errorMessage:", errorMessage);
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
        admin={admin}
        crawl={crawl}
      ></HeaderPresenter>
    </div>
  );
}
export default HeaderContainer;
