import React from "react";
import MapContainer from './MapContainer'
function ShelterInfoPresenter(){
    return(
        <div className="wrapper">
            <h3>유기동물 보호소 목록</h3>
            <MapContainer/>
        </div>
    
    )
}

export default ShelterInfoPresenter;