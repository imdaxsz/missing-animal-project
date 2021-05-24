import React, { useState,useEffect } from "react";
import WritePostPresenter from "./WritePostPresenter";
import axios from "axios";
import ip from '../../ipConfig.json'
function WritePostContainer() {

  const [postType, setPostType] = useState("실종신고");
  function selectPostType(select){
    setPostType(select);
  }
  useEffect(() => {
    console.log('변경감지')
    console.log(postType)
  }, [postType]);
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
      .post((ip['ip']+"/test"), formdata, config)
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
        postType={postType}
      ></WritePostPresenter>
    </>
  );
}

export default WritePostContainer;
