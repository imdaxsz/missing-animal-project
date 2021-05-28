import React, { useEffect, useState } from "react";
import UserPagePresenter from "./UserPagePresenter";
import {useRecoilValue } from "recoil";

import state from "../../store";

function UserPageContainer() {


  const userInfo = useRecoilValue(state["userState"]);
  return (
    <div>
      <UserPagePresenter
        userImgPath={userInfo.image}
        userEmail={userInfo.email}
        userName={userInfo.name}
      ></UserPagePresenter>
    </div>
  );
}


export default UserPageContainer;
