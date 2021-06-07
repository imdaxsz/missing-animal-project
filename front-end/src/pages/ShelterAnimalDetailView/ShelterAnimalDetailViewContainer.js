import React,{useEffect,useState} from "react";
import AnimalDetailViewPresenter from "./ShelterAnimalDetailViewPresenter";
import axios from 'axios'
import ip from "../../ipConfig.json";
import {useLocation} from 'react-router-dom'

function ShelterAnimalDetailViewContainer() {
    let data = useLocation();
    const [shelterAnimalDetailData,setShelterAnimalDetailData] = useState({postImg:["https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"]})
    useEffect(() => {
      window.scrollTo(0, 0);
      setShelterAnimalDetailData(data.state)
      console.log(data.state)
    })
    return (
        <div>
            <AnimalDetailViewPresenter shelterAnimalDetailData={shelterAnimalDetailData}></AnimalDetailViewPresenter>
        </div>
    )
}

export default ShelterAnimalDetailViewContainer;