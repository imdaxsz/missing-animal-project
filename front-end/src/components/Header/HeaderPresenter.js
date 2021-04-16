import styled, { css } from "styled-components";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import HeaderIcon from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  background-color: white;
  height: 65px;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px 0 15px;
  z-index: 99;
  border-bottom: 2px solid #e8e8e8;
  position: fixed;
  max-width: 500px;
  margin: 0 auto;
`;

const HeaderImg = styled.img`
  width: 150px;
`;

const StyledSideBar = styled.div`
  background-color: white;
  position: absolute;
  height: 100vh;
  right: 0;
  top: 0;
  overflow:hidden;

  &.ul{
    list-style:none;
  }

  ${(props) =>
    props.mode === "open"
      ? css`
          width: 300px;
          transition: 0.3s;
        `
      : css`
          width: 0;
          transition: 0.3s;
        `};
    
`;
function HeaderPresenter({ mode, switchMode }) {
  return (
    <div>
      <HeaderContainer>
        <Link to="/">
          <HeaderImg src={HeaderIcon}></HeaderImg>
        </Link>
        <div style={{ zIndex: "999" }} onClick={switchMode}>
          {mode === "open" ? (
            <MdClose size="24" color="#00a059" />
          ) : (
            <GiHamburgerMenu size="24" color="#00a059"></GiHamburgerMenu>
          )}
        </div>
        <StyledSideBar mode={mode}>
          <ul>
            <li>사용자정보</li>
            <li>내 동네 설정</li>
            <li>유기 동물 보호소 정보</li>
            <li>실시간 키워드 알림 설정</li>
            <li>로그아웃</li>
          </ul>
        </StyledSideBar>
      </HeaderContainer>
    </div>
  );
}

export default HeaderPresenter;
