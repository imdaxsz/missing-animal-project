import React, { useState, useEffect ,useCallback} from "react";
import ShelterAnimalListPresenter from "./ShelterAnimalListPresenter";
import axios from "axios";
import ip from "../../ipConfig.json";

function ShelterAnimalListContainer() {
  const [ShelterAnimalData, setShelterAnimalData] = useState([]);
  const URL = ip["ip"] + "/shelter/animal";
  const [sidoName, setSidoName] = useState("");
  const [sigunguName, setSigunguName] = useState("");
  const [sidoList, setSidoList] = useState([]);
  const [sigunguList, setSigunguList] = useState([]);
  const [count, setCount] = useState(1);
  
  useEffect(() => {
    ShelterAnimalData.length = 0
    setCount(1);
    getSigunguList(sidoName);
    setSigunguName("시/군/구 전체")
    console.log("시도 바뀜")
    console.log("teset",ShelterAnimalData)
    fetchData(sidoName, sigunguName);
  }, [sidoName]);

  useEffect(() => {
    setShelterAnimalData([]); // 어째서 안되는가 ? 
    ShelterAnimalData.length = 0 // 야매 ... 
    console.log("시군구 바뀜")
    console.log("teset",ShelterAnimalData)
    fetchData(sidoName, sigunguName);
  }, [sigunguName]);
  

  useEffect(() => {
    fetchData(sidoName, sigunguName);
  }, [count]);

  const infiniteScrollShelter = useCallback(() => 
  {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight === scrollHeight) {
      // 마지막에 도달하였을 경우?
      let tCount = count +1;
      setCount(tCount);
    }
  },[count]);
  useEffect(() => {
    window.addEventListener('scroll', infiniteScrollShelter, true);
    return () => window.removeEventListener('scroll', infiniteScrollShelter, true);
  }, [infiniteScrollShelter]);


  function fetchData(sidoSelect, sigunguSelect) {
    let tempURL = URL;
    if (sidoSelect === "시/도 전체" || sidoSelect === "") {
      if (sigunguSelect === "시/군/구 전체" || sigunguSelect === "") {
        tempURL = URL + "/" + count;
      }
      tempURL = URL + "/" + count;
    } else {
      if (sidoSelect !== "시/도 전체" && sidoSelect !== "") {
        tempURL = URL + "/" + sidoSelect + "/" + count;
        if (sigunguSelect !== "시/군/구 전체" && sigunguSelect !== "") {
          tempURL = URL + "/" + sidoSelect + "/" + sigunguSelect + "/" + count;
        }
      }
    }

    axios
      .get(tempURL)
      .then((res) => {
        let temp = ShelterAnimalData.concat(res.data.response.body.items.item);
        setShelterAnimalData(temp);
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
  }
  function getSigunguList(sido) {
    let tempRouter = "/get_sigungu_code";
    if (sido !== "") {
      tempRouter += "/" + sido;
      axios
        .get(ip["ip"] + tempRouter)
        .then((res) => {
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
  useEffect(() => {
    getSidoList();
    getSigunguList("");
    fetchData("시/도 전체", "시/군/구 전체");
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
