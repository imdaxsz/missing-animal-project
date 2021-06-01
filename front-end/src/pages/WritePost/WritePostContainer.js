import React, { useState, useEffect } from "react";
import WritePostPresenter from "./WritePostPresenter";
import axios from "axios";
import ip from "../../ipConfig.json";
import { useRecoilValue } from "recoil";
import state from "../../store";

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
  const [postImg, setPostImg] = useState(null); // 게시글 첨부 이미지
  const [writer, setWriter] = useState(""); // 게시글 작성자

  const [sidoList, setSidoList] = useState([]); // 시 도 리스트 저장
  const [sigunguList,setSigunguList] = useState([]) // 시 군 구 리스트 저장

  const userInfo = useRecoilValue(state["userState"]);

  function selectPostType(select) {
    setPostType(select);
  }
  function getSigunguList(sido) {
    let tempRouter = "/get_sigungu_code";
    if (sido !== "") {
      tempRouter += "/" + sido;
      axios
        .get(ip["ip"] + tempRouter)
        .then((res) => {
          console.log(res.data);
          let temp = Object.keys(res.data);
          temp.unshift("시/군/구 전체");
          setSigunguList(temp);
        })
        .catch((err) => {
          console.log(err);
          console.log("데이터 로드 실패");
        });
    } else {
      setSigunguList(["시/군/구 전체"]);
    }
  }
  function getSidoList() {
    axios
      .get(ip["ip"] + "/get_sido_code")
      .then((res) => {
        let temp = Object.keys(res.data);
        temp.unshift("시/도 전체");
        setSidoList(temp);
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
  }
  function createPost() {
    const formdata = new FormData();

    let errorMsg=[]

    if (title === ""){
      errorMsg.push("제목을 입력해주세요!\n");
    }
    if (postType === ""){
      errorMsg.push("게시글 종류를 선택해주세요!\n");
    }
    if (sex === ""){
      errorMsg.push("동물의 성별을 선택해주세요!\n");
    }
    if(classification === ""){
      errorMsg.push("동물이 개인지 고양이인지 기타인지 선택해주세요!\n");
    }
    if(age === ""){
      errorMsg.push("동물의 나이를 입력해주세요!\n")
    }
    if (weight === ""){
      errorMsg.push("동물의 몸무게를 입력해주세요.\n")
    }
    if (character === ""){
      errorMsg.push("동물의 눈에띄는 특징을 입력해주세요!\n");
    }
    if (sidoCode === ""){
      errorMsg.push("동물을 발견한 또는 잃어버린 시/도를 선택해주세요!\n");
    }
    if (sigunguCode === ""){
      errorMsg.push("동물을 발견한 또는 잃어버린 시/군/구를 선택해주세요!\n");
    }
    if (detailPlace === ""){
      errorMsg.push("동물을 발견한 또는 잃어버린 자세한 장소를 입력해주세요!\n")
    }
    if (contact === ""){
      errorMsg.push("연락받을 연락처를 입력해주세요!\n");
    }
    if(postContent === ""){
      errorMsg.push("본문을 입력해주세요!\n")
    }
    if(postImg === null){
      errorMsg.push("동물을 설명할 사진을 1장 이상 등록해주세요!\n");
    }

    if(errorMsg.length !== 0){
      let s = errorMsg.join('');
      alert(s)
    }
    else{
      formdata.append("title", title);
      formdata.append("postType", postType);
      formdata.append("breed", breed);
      formdata.append("sex", sex);
      formdata.append("classification", classification);
      formdata.append("age", age);
      formdata.append("weight", weight);
      formdata.append("character", character);
      formdata.append("lostDate", lostDate);
      formdata.append("sidoCode", sidoCode);
      formdata.append("sigunguCode", sigunguCode);
      formdata.append("detailPlace", detailPlace);
      formdata.append(
        "postDate",
        new Date().toISOString().substring(0, 10).replace(/-/g, "")
      );
      formdata.append("contact", contact);
      formdata.append("postContent", postContent);
      formdata.append("writer", userInfo.name);
  
      formdata.append("uid", userInfo.uid);
  
      if (postImg != null) {
        for (let i = 0; i < postImg.length; i++) {
          formdata.append("postImg[]", postImg[i]);
        }
      }
  
      var object = {};
      formdata.forEach(function (value, key) {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      console.log(json)
  
  
  
      var config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(ip["ip"] + "/postok", formdata, config)
        .then(function (response) {
          console.log(response);
          if(response.status === 200){
            alert("등록 성공!")
            // 화면 이동하기
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
  }
  useEffect(()=>{
    getSidoList();
    getSigunguList(sidoCode);
    console.log(sidoList,sigunguList)
  },[sidoCode])
  return (
    <>
      <WritePostPresenter
        createPost={createPost}
        selectPostType={selectPostType}
        postType={postType}
        setTitle={setTitle}
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
        setContact={setContact}
        setPostContent={setPostContent}
        setPostImg={setPostImg}
        setWriter={setWriter}
        sidoList={sidoList}
        sigunguList={sigunguList}
      ></WritePostPresenter>
    </>
  );
}

export default WritePostContainer;
