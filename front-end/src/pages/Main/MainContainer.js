import react, { useState, useEffect } from "react";
import MainPresenter from "./MainPresenter";
import ip from "../../ipConfig.json";
import axios from "axios";
function MainContainer() {
  // 화면 로드 시 스크롤을 맨 위로
  const [discRescAnimalData, setDiscRescAnimalData] = useState([]);
  const [count, setCount] = useState(1);
  const URL = ip["ip"];
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", infiniteScrollMain, true);
    setCount(1);
    fetchData();
  }, []);
  useEffect(()=>{
    fetchData();
  },[count])
  
  let a = 0
  function infiniteScrollMain() {
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
      setCount(count + 1)
    }
  }


  function fetchData() {
    let tempURL = URL + "/disc_resc/" + count;
    axios
      .get(tempURL)
      .then((res) => {
        let tempList = [];
        console.log(res.data)
        for (let postid in res.data) {
          let postData = res.data[postid];
          postData["postID"] = postid;
          tempList.push(postData);
        }
        console.log(tempList)
        
        setDiscRescAnimalData(discRescAnimalData.concat(tempList.reverse()))
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
  }
  return (
    <div>
      <MainPresenter discRescAnimalData={discRescAnimalData}></MainPresenter>
    </div>
  );
}
export default MainContainer;
