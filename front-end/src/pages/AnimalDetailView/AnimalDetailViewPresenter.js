import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import styled from "styled-components";
import ip from "../../ipConfig.json";
import { Carousel } from "react-bootstrap";
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
function AnimalDetailViewPresenter({ animalDetailData }) {
  return (
    <div className="wrapper">
      <ImageWrapper>
        <Carousel>
          {animalDetailData.postImg.map((item, index) => {
            return (<Carousel.Item key={index}  alt={item}>
              <Image
                width="100%"
                src={`${ip["ip"]}/static/images/${item}`}
                fluid
              />
            </Carousel.Item>);
          })}
        </Carousel>
      </ImageWrapper>

      <MainContent>
        <hr />
        <h4>
          <strong>[{animalDetailData.postType}]</strong>
          {animalDetailData.title}
        </h4>
        <hr />
        <StyledButton>수정</StyledButton>
        <StyledButton>삭제</StyledButton>
        <hr />
        <p>품종 : {animalDetailData.breed}</p>
        <p>나이 : {animalDetailData.age}</p>
        <p>몸무게 : {animalDetailData.weight}</p>
        <p>특징 : {animalDetailData.character}</p>
        <hr />
        <p>목격일 : {animalDetailData.lostDate}</p>
        <p>목격장소 : {animalDetailData.detailPlace}</p>
        <p>연락처 : {animalDetailData.contact}</p>

        <hr />
        <p>{animalDetailData.postContent}</p>
      </MainContent>
    </div>
  );
}

export default AnimalDetailViewPresenter;
