import React from "react";
import MapContainer from "./MapContainer";
function ShelterInfoPresenter({
  changeShelterInfo,
  shelterName,
  shelterAddress,
  shelterTel,
}) {
  return (
    <div className="wrapper">
      <h3>유기동물 보호소 목록</h3>
      <MapContainer changeShelterInfo={changeShelterInfo} />
      <hr />
      <h4>{shelterName}</h4>
      <p>{shelterAddress}</p>
      <p style={{"color":"green","fontWeight":"bold"}}>{shelterTel}</p>
    </div>
  );
}

export default ShelterInfoPresenter;
