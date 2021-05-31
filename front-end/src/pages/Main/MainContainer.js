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
    setCount(1);
    fetchData();
  }, []);

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
        setDiscRescAnimalData(tempList.reverse())
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
