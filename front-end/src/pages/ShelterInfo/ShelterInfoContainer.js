import React, { useState, useEffect } from "react";
import ShelterInfoPresenter from "./ShelterInfoPresenter";
//import ShelterInfoData from "../../data/shelter_info_dummy.json";
import axios from 'axios'
import ip from "../../ipConfig.json";
function ShelterInfoContainer() {
  const [shelterName,setShelterName] = useState("보호소 이름");
  const [shelterAddress,setshelterAddress] = useState("보호소 주소");
  const [shelterTel,setShelterTel] = useState("보호소 연락처");
  const [shelterInfo,setShelterInfo] = useState([])

  useEffect(()=>{

    let tempList=[]
    for(let i=1;i<14;i++){
      axios
      .get(ip["ip"] + "/shelter_info/"+i)
      .then((res) => {
        tempList = tempList.concat(Object.values(res.data));
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
    }
  },[])
  function changeShelterInfo(shelterInfoObj){
    window.scrollTo(0, 0);
    setShelterName(shelterInfoObj.name)
    setshelterAddress(shelterInfoObj.address)
    setShelterTel(shelterInfoObj.num)
  }
  
  return (
    <>
      <ShelterInfoPresenter shelterInfo={shelterInfo} changeShelterInfo={changeShelterInfo} shelterName={shelterName} shelterAddress={shelterAddress} shelterTel={shelterTel}/>
    </>
  );
}

export default ShelterInfoContainer;
