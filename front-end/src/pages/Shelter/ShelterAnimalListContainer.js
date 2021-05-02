import React, { useState, useEffect } from "react";
import ShelterAnimalListPresenter from "./ShelterAnimalListPresenter";
import axios from "axios";
function ShelterAnimalListContainer() {
  const [ShelterAnimalData,setShelterAnimalData] = useState([]);
  useEffect(() => {
    const serviceKey = "g4fjxGQYBDsO7DJoSVH4qbE9pCV7knL71oKLyPbukZeY5tbq%2BY2GoDr6EqXF1DaQ7Zr%2F4mJvB6Lia9cf%2B1DbGQ%3D%3D"
    axios
      .get(`http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?&pageNo=1&numOfRows=30&ServiceKey=${serviceKey}`)
      .then((res) => {
        setShelterAnimalData(res.data.response.body.items.item);
        console.log(res.data.response.body.items.item)
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패")
      });
  },[]); // mounted 와 같은 효과 

  return (
    <div>
      <ShelterAnimalListPresenter ShelterAnimalData={ShelterAnimalData}></ShelterAnimalListPresenter>
    </div>
  );
}

export default ShelterAnimalListContainer;
