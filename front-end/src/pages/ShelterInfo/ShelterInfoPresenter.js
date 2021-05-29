import React, { useEffect, useState } from "react";
import MapContainer from "./MapContainer";
import { AiFillPhone } from "react-icons/ai";
import { MdSms } from "react-icons/md";
import styled from "styled-components";
import ShelterInfoData from "../../data/Shelters.json";

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
}) {
  const [shelterList, setShelterList] = useState([
    {
      Juris: "대구광역시 수성구",
      name: "(사)대구수의사회",
      num: "053-764-3708",
      address: "대구광역시 북구 호국로 229 (서변동) 6층",
    },
    {
      Juris: "부산광역시 사하구",
      name: "(사)하얀비둘기",
      num: "051-293-9779",
      address: "부산광역시 강서구 제도로 726 (강동동)",
    },
    {
      Juris: "경기도 부천시",
      name: "24시아이동물메디컬",
      num: "032-677-5262",
      address: "경기도 부천시 오정구 원종동 229-8",
    },
  ]);
  return (
    <div className="wrapper">
      <h3>유기동물 보호소 목록</h3>
      <MapContainer changeShelterInfo={changeShelterInfo} />
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
      {shelterList.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
export default ShelterInfoPresenter;
