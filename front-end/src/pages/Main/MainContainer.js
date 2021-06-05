import react, { useState, useEffect, useCallback } from "react";
import MainPresenter from "./MainPresenter";
import ip from "../../ipConfig.json";
import axios from "axios";
function MainContainer() {
  // 화면 로드 시 스크롤을 맨 위로
  const [discRescAnimalData, setDiscRescAnimalData] = useState([]);
  const [count, setCount] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const URL = ip["ip"];
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", infiniteScrollMain, true);
    setCount(1);
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [count]);

  const infiniteScrollMain = useCallback(() => {
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
      let tCount = count + 1;
      setCount(tCount);
    }
  }, [count]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollMain, true);
    return () => window.removeEventListener("scroll", infiniteScrollMain, true);
  }, [infiniteScrollMain]);

  function searchResult(word) {
    setKeyword(word);
  }
  useEffect(() => {
    console.log(keyword);
    let tempURL = URL + "/disc_resc/all";
    axios
      .get(tempURL)
      .then((res) => {
        let tempList = [];
        for (let postid in res.data) {
          let postData = res.data[postid];
          postData["postID"] = postid;
          tempList.push(postData);
        }
        setDiscRescAnimalData(
          tempList
            .filter(
              (it) =>
                it.title.includes(keyword) ||
                it.breed.includes(keyword) ||
                it.postContent.includes(keyword) ||
                it.classification.includes(keyword) ||
                it.detailPlace.includes(keyword)
            )
            .reverse()
        );
      })
      .catch((err) => {});
  }, [keyword]);

  function fetchData() {
    let tempURL = URL + "/disc_resc/" + count;
    axios
      .get(tempURL)
      .then((res) => {
        let tempList = [];
        console.log(res.data);
        for (let postid in res.data) {
          let postData = res.data[postid];
          postData["postID"] = postid;
          tempList.push(postData);
        }
        console.log(tempList);

        setDiscRescAnimalData(discRescAnimalData.concat(tempList.reverse()));
      })
      .catch((err) => {
        console.log(err);
        console.log("데이터 로드 실패");
      });
  }

  return (
    <div>
      <MainPresenter
        discRescAnimalData={discRescAnimalData}
        searchResult={searchResult}
      ></MainPresenter>
    </div>
  );
}
export default MainContainer;
