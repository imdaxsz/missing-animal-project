import React, { useState } from "react";
import WritePostPresenter from "./WritePostPresenter";
import axios from "axios";
function WritePostContainer() {
  const [postType, setPostType] = useState("실종신고");
  function selectPostType(select){
    console.log(select)
    setPostType(select)
    console.log(postType)
  }
  function createPost() {
    const formdata = new FormData();

    formdata.append("title", "hello mehee");
    var config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post("http://192.168.234.178:5000/test", formdata, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <WritePostPresenter
        createPost={createPost}
        selectPostType={selectPostType}
      ></WritePostPresenter>
    </>
  );
}

export default WritePostContainer;
