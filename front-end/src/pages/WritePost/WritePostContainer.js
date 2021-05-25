import React, { useState, useEffect } from "react";
import WritePostPresenter from "./WritePostPresenter";
import axios from "axios";
import ip from "../../ipConfig.json";
function WritePostContainer() {
  // 게시글 변수

  const [title, setTitle] = useState(""); // 게시글 제목
  const [postType, setPostType] = useState("실종신고"); // 게시글 type

  const [breed, setBreed] = useState(""); // 동물 품종
  const [sex, setSex] = useState(""); // 동물 성별
  const [classification, setClassificaton] = useState(""); //동물 분류
  const [age, setAge] = useState(0); // 동물 나이
  const [weight, setWeight] = useState(0); // 동물 무게
  const [character, setCharacter] = useState(""); // 동물 특징

  const [lostDate, setLostDate] = useState(""); // 실종/목격/보호 일시
  const [sidoCode, setSidoCode] = useState(""); // 실종/목격/보호 시/도 코드
  const [sigunguCode, setSigunguCode] = useState(""); // 실종/목격/보호 시/군/구 코드
  const [detailPlace, setDetailPlace] = useState(""); // 실종/목격/보호 상세 장소

  const [postDate, setPostDate] = useState(""); // 게시글 작성 시간
  const [contact, setContact] = useState(""); // 게시글 연락처
  const [postContent, setPostContent] = useState(""); // 게시글 본문
  const [postImg, setPostImg] = useState([]); // 게시글 첨부 이미지
  const [writter, setWritter] = useState(""); // 게시글 작성자

  function selectPostType(select) {
    setPostType(select);

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
      .post(ip["ip"] + "/test", formdata, config)
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
        setTitle={setTitle}
        setPostCode={setPostCode}
        setBreed={setBreed}
        setSex={setSex}
        setClassificaton={setClassificaton}
        setAge={setAge}
        setWeight={setWeight}
        setCharacter={setCharacter}
        setLostDate={setLostDate}
        setSidoCode={setSidoCode}
        setSigunguCode={setSigunguCode}
        setDetailPlace={setDetailPlace}
        setPostDate={setPostDate}
        setContact={setContact}
        setPostContent={setPostContent}
        setPostImg={setPostImg}
        setWritter={setWritter}


      ></WritePostPresenter>
    </>
  );
}

export default WritePostContainer;
