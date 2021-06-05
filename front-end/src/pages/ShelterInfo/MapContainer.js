// MapContainer.js
import React, {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import ShelterInfoData from "../../data/shelter_info_dummy.json";
const { kakao } = window;
let map = null;

const MapContainer = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    changeMaker(item) {
      console.log(item);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(item.address, function (result, status) {
        if (status === daum.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            clickable: true,
          });

          // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          // map.setCenter(coords);

          var iwContent = '<div style="padding:5px;">' + item.name + "</div>", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
            iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function () {
            // 마커 위에 인포윈도우를 표시합니다
            infowindow.open(map, marker);
            //changeShelterInfo(item);
          });
          
          map.setCenter(coords);
          
        }
      });
    },
  }));


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

    // let shelterList = [];
    // for (var key in ShelterInfoData) {
    //   shelterList.push(ShelterInfoData[key]);
    // }

    // shelterList.forEach(function (item, index) {
    //   geocoder.addressSearch(item.address, function (result, status) {
    //     if (status === daum.maps.services.Status.OK) {
    //       var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

    //       // 결과값으로 받은 위치를 마커로 표시합니다
    //       var marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords,
    //         clickable: true,
    //       });

    //       // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //       // map.setCenter(coords);

    //       var iwContent = '<div style="padding:5px;">' + item.name + "</div>", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //         iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    //       // 인포윈도우를 생성합니다
    //       var infowindow = new kakao.maps.InfoWindow({
    //         content: iwContent,
    //         removable: iwRemoveable,
    //       });

    //       // 마커에 클릭이벤트를 등록합니다
    //       kakao.maps.event.addListener(marker, "click", function () {
    //         // 마커 위에 인포윈도우를 표시합니다
    //         infowindow.open(map, marker);
    //         //changeShelterInfo(item);
    //       });
    //     }
    //   });
    // });
  }, []);
  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "400px",
        zIndex: "0",
      }}
    ></div>
  );
});

export default MapContainer;
