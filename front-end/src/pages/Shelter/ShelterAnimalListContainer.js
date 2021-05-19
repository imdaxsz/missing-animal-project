import React, { useState, useEffect } from "react";
import ShelterAnimalListPresenter from "./ShelterAnimalListPresenter";
import axios from "axios";
function ShelterAnimalListContainer() {
  const [ShelterAnimalData, setShelterAnimalData] = useState([]);
  const URL = "http://192.168.234.178:5000/shelter/animal"

  function fetchData(select) {
    let tempURL=URL
    if (select !== "전체"){
      tempURL += ("/"+select)
    } 
    console.log(tempURL)
    axios
    .get(tempURL)
    .then((res) => {
      setShelterAnimalData(res.data.response.body.items.item);
      console.log(res.data.response.body.items.item);
    })
    .catch((err) => {
      console.log(err);
      console.log("데이터 로드 실패");
    });
  }
  function AreaSelectChange(select) {
    fetchData(select)
  }
  useEffect(() => {
    fetchData("전체");
  }, []); // mounted 와 같은 효과

  return (
    <div>
      <ShelterAnimalListPresenter
        AreaSelectChange={AreaSelectChange}
        ShelterAnimalData={ShelterAnimalData}
      ></ShelterAnimalListPresenter>
    </div>
  );
}

export default ShelterAnimalListContainer;
