import styled, { css } from "styled-components";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FiLogOut, FiSettings, FiMapPin, FiUser } from "react-icons/fi";
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
  max-width: 500px;
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
  width:300px;
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
          width:300px;
          box-shadow : rgba(0,0,0,0.5) 0 0 0 9999px;
          z-index : 100;
        `
      : css`
          width:0;
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
            <li>
              <IconContainer>
                <FiUser />
              </IconContainer>
              사용자정보
            </li>
            <li>
              <IconContainer>
                <FiMapPin />
              </IconContainer>
              내 동네 설정
            </li>
            <li>
              <IconContainer>
                <BiInfoCircle />
              </IconContainer>
              유기 동물 보호소 정보
            </li>
            <li>
              <IconContainer>
                <FiSettings />
              </IconContainer>
              실시간 키워드 알림 설정
            </li>
            <li>
              <IconContainer>
                <FiLogOut />
              </IconContainer>
              로그아웃
            </li>
          </ul>
        </StyledSideBar>
      </HeaderContainer>
    </div>
  );
}

export default HeaderPresenter;
