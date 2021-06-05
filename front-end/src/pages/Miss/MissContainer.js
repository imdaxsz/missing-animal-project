import react, { useState, useEffect } from "react";
import MissPresenter from "./MissPresenter";
import ip from "../../ipConfig.json";
import axios from "axios";
function MissContainer() {
  // 화면 로드 시 스크롤을 맨 위로
  const [discRescAnimalData, setDiscRescAnimalData] = useState([]);
  const [count, setCount] = useState(1);
  const [keyword,setKeyword] = useState("")
  const [searchResultList,setSearchResultList] = useState([])
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

  function searchResult(word){
    setKeyword(word)
    
  }
  useEffect(()=>{
    console.log(keyword)
    let tempURL = URL + "/mis/all";
    axios
      .get(tempURL)
      .then((res) => {
        let tempList = [];
        for (let postid in res.data) {
          let postData = res.data[postid];
          postData["postID"] = postid;
          tempList.push(postData);
        }
        setDiscRescAnimalData(tempList.filter(it => it.title.includes(keyword)||it.breed.includes(keyword) || it.postContent.includes(keyword)||it.classification.includes(keyword)))

      })
      .catch((err) => {
      });
  },[keyword])

  function fetchData() {
    let tempURL = URL + "/mis/" + count;
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
      <MissPresenter discRescAnimalData={discRescAnimalData} searchResult={searchResult}></MissPresenter>
    </div>
  );
}
export default MissContainer;
