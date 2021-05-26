import React, { useEffect, useState } from "react";
import UserPagePresenter from "./UserPagePresenter";
function UserPageContainer() {
  const [userImgPath, setUserImgPath] = useState(
    "https://blog.netsarang.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
  );
  const [userEmail, setUserEmail] = useState("default");
  const [userName, setUserName] = useState("로그인 하세요");

//   useEffect(() => {
//       console.log(props.state)
//     let loginUser = props.state["user"];
//     if (loginUser !== null)
//     setUserName(loginUser.displayName);
//     setUserImgPath(loginUser.photoURL);
//     setUserEmail(loginUser.email);
//     console.log(userImgPath, userEmail, userName);
//   },);
  return (
    <div>
      <UserPagePresenter
        userImgPath={userImgPath}
        userEmail={userEmail}
        userName={userName}
      ></UserPagePresenter>
    </div>
  );
}


export default UserPageContainer;
