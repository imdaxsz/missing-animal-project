import react, { useState,useEffect } from "react";
import MainPresenter from "./MainPresenter";

function MainContainer() {
  // 화면 로드 시 스크롤을 맨 위로
  useEffect(()=>{
    window.scrollTo(0,0);
    console.log("test")
  },[])
  return (
    <div>
      <MainPresenter></MainPresenter>
    </div>
  );
}

export default MainContainer;
