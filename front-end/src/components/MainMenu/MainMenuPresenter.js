import styled,{css} from "styled-components";
import React from "react";

const MenuContainer = styled.div`
    display:flex;
    justify-content:space-between;
    width:80%;
    position:relative;
    top:100px;
    margin:0 auto;
    
`

const StyledButton = styled.button`

    color:white;
    font-weight:bold;
    text-align:center;
    border-radius:10px;
    background-color:#00a059;
    z-index:10;
    border:none;
    width:120px;
    height:40px;

    &:hover{
        background-color:#30b87b
    }
`
function MainMenuPresenter() {
    return (
      <div>
          <MenuContainer>
              <StyledButton>실종동물 찾기</StyledButton>
              <StyledButton>실종신고 목록</StyledButton>
              <StyledButton>보호소</StyledButton>
          </MenuContainer>
      </div>
    );
  }
  
  export default MainMenuPresenter;