import React, { useState } from "react";
import MainMenuPresenter from "./MainMenuPresenter";

function MainMenuContainer() {
  const [animalData, setAninalData] = useState([
    { species: "코리안숏헤어", sex: "미확인", age: 5,weight:4,missingDate:"2021-03-13",missingLocate:"경북 구미시"},
  ]);
  return (
    <div>
      <MainMenuPresenter></MainMenuPresenter>
    </div>
  );
}

export default MainMenuContainer;
