import styled, { css } from "styled-components";
import React,{useEffect} from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import {
  FiLogOut,
  FiSettings,
  FiMapPin,
  FiUser,
  FiLogIn,
} from "react-icons/fi";
import { BiInfoCircle } from "react-icons/bi";
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
  margin: 0 auto;
`;

const HeaderImg = styled.img`
  width: 150px;
`;

const IconContainer = styled.span`
  padding-right: 10px;
`;
const StyledSideBar = styled.div`
  background-color: white;
  position: absolute;
  height: 100vh;
  right: 0;
  top: 0;
  overflow: hidden;
  transition: 0.3s all;
  width: 70%;

  @media screen and (min-width: 850px) {
    /* 데스크탑에서 사용될 스타일을 여기에 작성합니다. */
    width: 40%;
  }
  ul {
    list-style: none;
    padding-left: 0;
    margin-top: 65px;
    font-weight: bold;
    font-size: 20px;
    li {
      padding: 20px 10px 20px 30px;

      &:hover {
        background-color: #00a059;
        cursor: pointer;
        color: white;
      }
    }
  }

  ${(props) =>
    props.mode === "open"
      ? css`
          right: 0%;
          box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 9999px;
          z-index: 100;
        `
      : css`
          right: -100%;
        `};
`;
function HeaderPresenter({ mode, switchMode, isLogin, googleLogin, googleLogout }) {
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
          {isLogin === "login" ? (
            <ul>
              <Link to="/user_page">
                <li>
                  <IconContainer>
                    <FiUser />
                  </IconContainer>
                  사용자정보
                </li>
              </Link>

              <li>
                <IconContainer>
                  <FiMapPin />
                </IconContainer>
                내 동네 설정
              </li>
              <Link to="/shelter_info">
                <li>
                  <IconContainer>
                    <BiInfoCircle />
                  </IconContainer>
                  유기 동물 보호소 정보
                </li>
              </Link>
              <li>
                <IconContainer>
                  <FiSettings />
                </IconContainer>
                실시간 키워드 알림 설정
              </li>
              <li onClick={googleLogout}>
                <IconContainer>
                  <FiLogOut />
                </IconContainer>
                로그아웃
              </li>
            </ul>
          ) : (
            <ul>
              <li onClick={googleLogin}>
                <IconContainer>
                  <FiLogIn />
                </IconContainer>
                로그인
              </li>
              <li >
                <IconContainer>
                  <FiUser />
                </IconContainer>
                회원가입
              </li>
            </ul>
          )}
        </StyledSideBar>
      </HeaderContainer>
    </div>
  );
}

export default HeaderPresenter;
