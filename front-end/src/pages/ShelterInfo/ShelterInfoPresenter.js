import React, { useEffect, useState,useRef } from "react";
import MapContainer from "./MapContainer";
import { AiFillPhone } from "react-icons/ai";
import { MdSms } from "react-icons/md";
import styled from "styled-components";

const StyledTelLink = styled.a`
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  background-color: #00a059;
  z-index: 10;
  border: none;
  padding: 10px;
  text-decoration: none;
  &:hover {
    background-color: #30b87b;
    text-decoration: none;
    color: white;
  }
  margin-right: 10px;
`;

function ShelterInfoPresenter({
  changeShelterInfo,
  shelterName,
  shelterAddress,
  shelterTel,
  shelterInfo,
}) {
  const mapRef = useRef(null);



  return (
    <div className="wrapper">
      <h3>유기동물 보호소 목록</h3>
      <MapContainer ref={mapRef}/>
      <hr />
      <h4>{shelterName}</h4>
      <p>{shelterAddress}</p>
      <p style={{ color: "green", fontWeight: "bold" }}>{shelterTel}</p>
      <span>
        <StyledTelLink href={"tel:" + shelterTel}>
          <AiFillPhone style={{ marginRight: "1px" }} />
          전화걸기
        </StyledTelLink>
        <StyledTelLink href={"sms:" + shelterTel}>
          <MdSms style={{ marginRight: "1px" }} />
          문자 보내기
        </StyledTelLink>
      </span>
      <hr />
      <div style={{"overflow":"scroll","height":"500px"}}>
      {shelterInfo.map((item, index) => {
        return (
          <div key={index} onClick={()=>{changeShelterInfo(item);mapRef.current.changeMaker(item)}} style={{"cursor":"pointer"}}>
            <p>{item.name}</p>
            <hr />
          </div>
        );
      })}
      </div>

    </div>
  );
}


export default ShelterInfoPresenter;
