import styled from "styled-components";
import React from "react";
import {BsThreeDotsVertical} from 'react-icons/bs'
import HeaderIcon from '../../assets/img/logo.png'
const HeaderContainer = styled.div`
  background-color:white;
  height:65px;
  max-width:520px;
  right:0;
  left:0;
  margin:0 auto;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 15px 0 15px;
  z-index:99;
  border-bottom:2px solid #e8e8e8;
  position:fixed;
`

const HeaderImg = styled.img`
  width:150px;
`

function HeaderPresenter() {
  return (
    <div>
        <HeaderContainer>
            <HeaderImg src={HeaderIcon}></HeaderImg>
            <BsThreeDotsVertical size="24" color="#00a059"></BsThreeDotsVertical>
        </HeaderContainer>
    </div>
  );
}

export default HeaderPresenter;
