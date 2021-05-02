import React, { useState, useEffect } from "react";
import ShelterAnimalListPresenter from "./ShelterAnimalListPresenter";
import axios from "axios";
function ShelterAnimalListContainer() {
  const [ShelterAnimalData, setShelterAnimalData] = useState([]);
  const serviceKey ="g4fjxGQYBDsO7DJoSVH4qbE9pCV7knL71oKLyPbukZeY5tbq%2BY2GoDr6EqXF1DaQ7Zr%2F4mJvB6Lia9cf%2B1DbGQ%3D%3D";
  const URL = `http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?&pageNo=1&numOfRows=30&ServiceKey=${serviceKey}`

  const [areaURL , setAreaURL] = useState(URL);
  function fetchData(url) {
    axios
      .get(url)
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
    let areaCode = 0;
    let tempURL = ""
    if(select === "전체"){
      areaCode = 0;
      tempURL = URL;
    }
    else{
      console.log(select)
      if (select === "서울특별시") {
        areaCode = 6110000;
      }
      else if (select === "경상북도") {
        areaCode = 6470000;
      }
      else if (select === "전라북도") {
        areaCode = 6450000;
      }
      else if (select === "강원도") {
        areaCode = 6420000;
      }
      tempURL = URL + `&upr_cd=${areaCode}`;
    }
    setAreaURL(tempURL);
    fetchData(areaURL);
    console.log(areaURL);
  }
  useEffect(() => {
    fetchData(URL);
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
