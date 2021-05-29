import React, { useState, useEffect } from "react";
import ShelterAnimalListPresenter from "./ShelterAnimalListPresenter";
import axios from "axios";
import ip from "../../ipConfig.json";
import firebase from "firebase";

function ShelterAnimalListContainer() {
  const [ShelterAnimalData, setShelterAnimalData] = useState([]);
  const URL = ip["ip"] + "/shelter/animal";
  const [sidoName, setSidoName] = useState("");
  const [sigunguName, setSigunguName] = useState("");
  const [sidoList, setSidoList] = useState([]);
  const [sigunguList,setSigunguList] = useState([]);

  useEffect(()=>{

    fetchData(sidoName,sigunguName);
    getSigunguList(sidoName)
    console.log(sigunguList)

  },[sidoName,sigunguName])
  

  function fetchData(sidoSelect,sigunguSelect) {
    let tempURL = URL;
    if (sidoSelect === "시/도 전체" || sidoSelect===""){
      if (sigunguSelect === "시/군/구 전체" || sigunguSelect==="") {
        tempURL =URL
      }
      tempURL =URL
    }
    else{
      if(sidoSelect !== "시/도 전체" && sidoSelect !== ""){
        tempURL +="/"+sidoSelect;
        if(sigunguSelect !== "시/군/구 전체" && sigunguSelect !== ""){
          tempURL +="/"+sigunguSelect
        }
      }
    }

    console.log(tempURL);
    axios
      .get(tempURL)
      .then((res) => {
        setShelterAnimalData(res.data.response.body.items.item);
        console.log(res.data.response.body.items.item);
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
  }
  function getSigunguList(sido) {

    let tempRouter = "/get_sigungu_code"
    if(sido !== ""){
      tempRouter +="/"+sido
      axios
      .get(ip["ip"] + tempRouter)
      .then((res) => {
        console.log(res.data)
        let temp = Object.keys(res.data);
        temp.unshift("시/군/구 전체");
        setSigunguList(temp)
        
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
    }
    else{
      setSigunguList(["시/군/구 전체"])
    }
    
  }
  function getSidoList() {
    axios
      .get(ip["ip"] + "/get_sido_code")
      .then((res) => {
        let temp = Object.keys(res.data);
        temp.unshift("시/도 전체");
        setSidoList(temp)
        
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
    
  }
  useEffect(() => {
    getSidoList();
    getSigunguList("");
    fetchData("시/도 전체","시/군/구 전체");
  }, []); // mounted 와 같은 효과

  return (
    <div>
      <ShelterAnimalListPresenter
        ShelterAnimalData={ShelterAnimalData}
        setSidoName={setSidoName}
        setSigunguName={setSigunguName}
        sidoList={sidoList}
        sigunguList={sigunguList}

      ></ShelterAnimalListPresenter>
    </div>
  );
}

export default ShelterAnimalListContainer;
