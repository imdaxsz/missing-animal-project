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
function AnimalDetailViewPresenter() {
  return (
    <div className="wrapper">
      <ImageWrapper>
        <Image
          width="100%"
          src={require(`../../assets/images/animal1.jpg`).default}
          fluid
        />
      </ImageWrapper>
      <MainContent>
        <hr />
        <h4>
          <strong>[임시보호]</strong>고양이를 임시보호 중입니다
        </h4>
        <hr />
        <StyledButton>수정</StyledButton>
        <StyledButton>삭제</StyledButton>
        <hr />
        <p>품종 : 코리안숏헤어</p>
        <p>나이 : 5살</p>
        <p>몸무게 : 4kg</p>
        <p>특징 : 체구가 작음</p>
        <hr />
        <p>목격일 : 2021-03-13</p>
        <p>목격장소 : 구미시 거의동 금오공대 일대</p>
        <p>연락처 : 010 - 1234 - 5678</p>

        <hr />
        <p>
          금오공대를 돌아다니고 있어요. 주인분 계시면 연락주세요. 임시보호
          중입니다.
        </p>
      </MainContent>
    </div>
  );
}

export default AnimalDetailViewPresenter;
