import styled, { css } from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const MenuContainer = styled.div`
  background-color: white;
  height: 65px;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  position: fixed;
  top: 65px;
  max-width: 500px;
  padding: 0 15px 0 15px;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  background-color: #00a059;
  z-index: 10;
  border: none;
  width: 120px;
  height: 40px;

  &:hover {
    background-color: #30b87b;
  }
`;
function MainMenuPresenter() {
  return (
    <div>
      <MenuContainer>
        <Link to="/">
          <StyledButton>실종동물 찾기</StyledButton>
        </Link>
        <Link to="/miss_animal">
          <StyledButton>실종신고 목록</StyledButton>
        </Link>
        <Link to="/shelter">
          <StyledButton>보호소</StyledButton>
        </Link>
      </MenuContainer>
    </div>
  );
}

export default MainMenuPresenter;
