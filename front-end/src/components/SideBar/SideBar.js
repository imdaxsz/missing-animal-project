import React from "react";
import styled, { css } from "styled-components";

const StyledSideBar = styled.div`
  background-color: red;
  height: 100vh;
  z-index: 99;
  position: fixed;

  ${(props) =>
    props.mode === "open"
      ? css`
          width: 250px;
        `
      : css`
          width: 0;
        `};
`;
function SideBar() {
  return (
    <>
      <StyledSideBar mode={"open"}></StyledSideBar>
    </>
  );
}

export default SideBar;
