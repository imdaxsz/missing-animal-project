// MapContainer.js
import React, { useEffect } from "react";
import ShelterInfoData from "../../data/Shelters.json";

const { kakao } = window;

function MapContainer() {
  let map = null;
  useEffect(() => {
    const container = document.getElementById("myMap");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude,
          lon = position.coords.longitude;
        let options = {
          center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표
          level: 3,
        };
        map = new kakao.maps.Map(container, options);
      });
    } else {
      let options = {
        center: new kakao.maps.LatLng(37.5677463677699, 126.9153946742084), //지도의 중심좌표
        level: 3,
      };
      map = new kakao.maps.Map(container, options);
    }
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // for in 문 으로 json Object 출력
    for (var key in ShelterInfoData) {
      geocoder.addressSearch(
        ShelterInfoData[key].address,
        function (result, status){
          // 정상적으로 검색이 완료됐으면
          
          if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({ map: map, position: coords });

            // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            // map.setCenter(coords);
          }
        }
      );
    }
  }, []);
  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "500px",
      }}
    ></div>
  );
}

export default MapContainer;
