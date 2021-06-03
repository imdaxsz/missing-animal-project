import React from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";

const ImageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
`;

const MainContent = styled.div`
  margin-top: 10px;
`;

const StyledButton = styled.button`
  width: 70px;
  height: 40px;
  border: none;
  margin-left: 5px;
  margin-right: 5px;
`;
function ShelterAnimalDetailViewPresenter({ shelterAnimalDetailData }) {
  return (
    <div className="wrapper">
      <ImageWrapper>
        <Image width="100%" src={shelterAnimalDetailData.popfile} fluid />
      </ImageWrapper>
      <MainContent>
        <hr />
        <h4>
          <strong>[{shelterAnimalDetailData.processState}]</strong>
          {shelterAnimalDetailData.kindCd}
        </h4>
        <hr />
        <p>품종 : {shelterAnimalDetailData.kindCd}</p>
        <p>공고번호 : {shelterAnimalDetailData.noticeNo}</p>
        <p>
          공고기간 :{" "}
          {shelterAnimalDetailData.noticeSdt}
          ~
          {shelterAnimalDetailData.noticeEdt}
        </p>
        <p>성별 : {shelterAnimalDetailData.sexCd === "M" ? "수컷" : "암컷"}</p>
        <p>무게 : {shelterAnimalDetailData.weight}</p>
        <hr />
        <p>목격일 : {shelterAnimalDetailData.happenDt}</p>
        <p>목격장소 : {shelterAnimalDetailData.happenPlace}</p>
        <p>
          보호장소 : {shelterAnimalDetailData.careAddr}{" "}
          {shelterAnimalDetailData.careNm}
        </p>
        <p>연락처 : {shelterAnimalDetailData.careTel}</p>

        <hr />
        <p>{shelterAnimalDetailData.specialMark}</p>
      </MainContent>
    </div>
  );
}

export default ShelterAnimalDetailViewPresenter;
