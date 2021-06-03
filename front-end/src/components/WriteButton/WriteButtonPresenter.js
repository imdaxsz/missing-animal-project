import styled, { css } from "styled-components";
import React from "react";
import {Link} from 'react-router-dom'
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
  max-width:500px;
  width:100%;
  
`;
function WriteButtonPresenter({isLogin}) {
  return (
    <div>
        {isLogin==="login" ? <Link to="/writePost"><FloatingButton>글쓰기</FloatingButton></Link> : null}
    </div>
  );
}

export default WriteButtonPresenter;
