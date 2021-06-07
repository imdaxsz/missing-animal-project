import React,{useState} from "react";
import WriteButtonPresenter from "./WriteButtonPresenter";
import { useRecoilValue } from "recoil";
import state from "../../store";

function WriteButtonContainer() {
  const isLogin = useRecoilValue(state["loginState"]);
  return (

    <div>
      <WriteButtonPresenter isLogin={isLogin}></WriteButtonPresenter>
    </div>
  );
}

export default WriteButtonContainer;
