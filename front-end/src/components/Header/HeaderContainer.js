import React, { useState } from "react";
import HeaderPresenter from "./HeaderPresenter";
function HeaderContainer() {
  const [mode, setMode] = useState("close");

  function switchMode() {
    if(mode === "open"){
      setMode("close")
    }
    else{
      setMode("open")
    }
  }

  return (
    <div>
      <HeaderPresenter mode={mode} switchMode={switchMode}></HeaderPresenter>
    </div>
  );
}

export default HeaderContainer;
