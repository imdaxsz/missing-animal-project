import React, { useState, useEffect } from "react";
import ShelterInfoPresenter from "./ShelterInfoPresenter";
function ShelterInfoContainer() {
  const [shelterName,setShelterName] = useState("조회하고자 하는 보호소의 마커를 클릭하세요");
  const [shelterAddress,setshelterAddress] = useState("조회하고자 하는 보호소의 마커를 클릭하세요");
  const [shelterTel,setShelterTel] = useState("조회하고자 하는 보호소의 마커를 클릭하세요");

  function changeShelterInfo(shelterInfoObj){
    setShelterName(shelterInfoObj.name)
    setshelterAddress(shelterInfoObj.address)
    setShelterTel(shelterInfoObj.num)
  }
  return (
    <>
      <ShelterInfoPresenter changeShelterInfo={changeShelterInfo} shelterName={shelterName} shelterAddress={shelterAddress} shelterTel={shelterTel}/>
    </>
  );
}

export default ShelterInfoContainer;
