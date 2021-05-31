import React, { useEffect, useState } from "react";
import AnimalDetailViewPresenter from "./AnimalDetailViewPresenter";
import axios from "axios";
import { BiDisc } from "react-icons/bi";
import ip from "../../ipConfig.json";
function AnimalDetailViewContainer() {
  const [animalDetailData,setAnimalDetailData] = useState({postImg:["https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"]})
  useEffect(() => {
    window.scrollTo(0, 0);
    let tmp = window.location.href.split("/");

    let postID = tmp[5];
    let postCode = tmp[4];
    if (postCode === "%EC%9E%84%EC%8B%9C%EB%B3%B4%ED%98%B8"){
        postCode = 'resc'
    }
    if (postCode === "%EB%AA%A9%EA%B2%A9%EC%A0%9C%EB%B3%B4"){
        postCode = 'disc'
    }
    if (postCode === "%EC%8B%A4%EC%A2%85%EC%8B%A0%EA%B3%A0"){
        postCode = 'mis'
    }
    let URL = ip['ip']+"/detail/"+postCode+"/"+postID
    console.log(URL)
    axios
      .get(URL)
      .then((res) => {
          let animal = res.data
          setAnimalDetailData(animal)
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
  },[]);
  return (
    <div>
      <AnimalDetailViewPresenter animalDetailData={animalDetailData}></AnimalDetailViewPresenter>
    </div>
  );
}

export default AnimalDetailViewContainer;
