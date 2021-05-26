import React ,{useEffect}from "react";
import styled from "styled-components";

const UserImageContainer = styled.div`
  width: 50%;
  height: 50%;
  margin: 0 auto;
`;

function UserPagePresenter({userImgPath,userName,userEmail}) {

  return (
    <div className="wrapper">
      <UserImageContainer>
        <img
          width="100%"
          height="100%"
          src={userImgPath!==null? userImgPath : "https://blog.netsarang.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"}
        />
      </UserImageContainer>
      <br />
      <h3>
        <strong>{userName!==null? userName:"loading..."} 님</strong>
      </h3>
      <h5>전화번호 ㅣ 010-1234-5678</h5>
      <h5>이메일 ㅣ {userEmail!==null? userEmail : "loading..."}</h5>
    </div>
  );
}

export default UserPagePresenter;
