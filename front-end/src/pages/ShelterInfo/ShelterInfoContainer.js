import React, { useState, useEffect } from "react";
import ShelterInfoPresenter from "./ShelterInfoPresenter";
import ShelterInfoData from "../../data/shelter_info_dummy.json";
function ShelterInfoContainer() {
  const [shelterName,setShelterName] = useState("보호소 이름");
  const [shelterAddress,setshelterAddress] = useState("보호소 주소");
  const [shelterTel,setShelterTel] = useState("보호소 연락처");
  const [shelterInfo,setShelterInfo] = useState([])

  useEffect(()=>{
    setShelterInfo(Object.values(ShelterInfoData))
  },[])
  function changeShelterInfo(shelterInfoObj){
    setShelterName(shelterInfoObj.name)
    setshelterAddress(shelterInfoObj.address)
    setShelterTel(shelterInfoObj.num)
    console.log(shelterInfoObj)
  }
  return (
    <>
      <ShelterInfoPresenter shelterInfo={shelterInfo} changeShelterInfo={changeShelterInfo} shelterName={shelterName} shelterAddress={shelterAddress} shelterTel={shelterTel}/>
    </>
  );
}

export default ShelterInfoContainer;
