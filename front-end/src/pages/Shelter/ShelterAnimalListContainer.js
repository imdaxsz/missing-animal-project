import React, { useState, useEffect } from "react";
import ShelterAnimalListPresenter from "./ShelterAnimalListPresenter";
import axios from "axios";
import ip from '../../ipConfig.json'
import firebase from "firebase";

function ShelterAnimalListContainer() {
  const [ShelterAnimalData, setShelterAnimalData] = useState([]);
  const URL = ip['ip']+"/shelter/animal";
  const [sidoCode,setSidoCode] = useState("");
  const [sigunguCode,setSigunguCode] = useState("");
  const [sidoList,setSidoList] = useState([]);

  function changeSidoCode(sidoName){
    setSidoCode(sidoName);
  }
  useEffect(()=>{
    fetchData(sidoCode);
  },[sidoCode])
  
  function fetchData(select) {
    let tempURL = URL;
    if (select !== "전체") {
      tempURL += "/" + select;
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
  function getSigunguList(sidoName){
    firebase .database().ref("지역코드/").child('6110000').on("value", (e) => {
      console.log(e.val())
      const keys = Object.keys(e.val())
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i] // 각각의 키
        const value = e.val()[key] // 각각의 키에 해당하는 각각의 값
      
        console.log(value)
      }
    });
  }
  function getSidoList(){
    firebase .database().ref("지역코드/").on("value", (e) => {
      const keys = Object.keys(e.val())
      let temp = []
      temp.push("전체")
      for(let i=0;i<keys.length;i++){
        const key = keys[i] // 각각의 키
        const value = e.val()[key] // 각각의 키에 해당하는 각각의 값
        temp.push(value[key])
      }
      setSidoList(temp)
    });
  }
  useEffect(() => {
    getSidoList();
    fetchData("전체");

  }, []); // mounted 와 같은 효과

  return (
    <div>
      <ShelterAnimalListPresenter
        ShelterAnimalData={ShelterAnimalData}
        changeSidoCode={changeSidoCode}
        sidoList={sidoList}
      ></ShelterAnimalListPresenter>
    </div>
  );
}

export default ShelterAnimalListContainer;
