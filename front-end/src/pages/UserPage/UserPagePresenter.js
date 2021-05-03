import React from "react";
import styled from "styled-components";

const UserImageContainer = styled.div`
  width: 50%;
  height: 50%;
  margin: 0 auto;
`;

function UserPagePresenter() {
  return (
    <div className="wrapper">
      <UserImageContainer>
        <img
          width="100%"
          height="100%"
          src={require("../../assets/img/user.png").default}
        />
      </UserImageContainer>
      <br />
      <h3>
        <strong>전하영 님</strong>
      </h3>
      <h5>전화번호 ㅣ 010-1234-5678</h5>
      <h5>이메일 ㅣ jhy901@naver,com</h5>
    </div>
  );
}

export default UserPagePresenter;
