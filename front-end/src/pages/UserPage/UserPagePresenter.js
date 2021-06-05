import React, { useEffect } from "react";
import styled from "styled-components";

const UserImageContainer = styled.div`
  width: 50%;
  height: 50%;
  margin: 0 auto;
`;

function UserPagePresenter({ userImgPath, userName, userEmail }) {
  return (
    <div className="wrapper">
      <UserImageContainer>
        <img width="100%" height="100%" src={userImgPath} />
      </UserImageContainer>
      <br />
      <h3>
        <strong>{userName} 님</strong>
      </h3>
      <h5>Email ㅣ {userEmail}</h5>
    </div>
  );
}

export default UserPagePresenter;
