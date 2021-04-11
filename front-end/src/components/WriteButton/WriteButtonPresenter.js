import styled, { css } from "styled-components";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  `
const FloatingButton = styled.button`
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: #00a059;
  z-index: 10;
  border: none;
  height: 40px;
  position: fixed;
  bottom:0;
  &:hover {
    background-color: #30b87b;
  }
  width:500px;
  
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
