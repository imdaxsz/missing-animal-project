import styled, { css } from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width:100%;
  height:100px;
  
  `
const FloatingButton = styled.button`
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
  background-color: #00a059;
  z-index: 10;
  border: none;
  width: 120px;
  height: 40px;
  position: fixed;
  bottom: 10px;
  &:hover {
    background-color: #30b87b;
  }
`;
function WriteButtonPresenter() {
  return (
    <div>
      <Wrapper>
        <FloatingButton>글쓰기</FloatingButton>
      </Wrapper>
    </div>
  );
}

export default WriteButtonPresenter;
