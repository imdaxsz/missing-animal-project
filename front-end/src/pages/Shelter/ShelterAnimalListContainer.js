import React, { useState } from "react";
import ShelterAnimalListPresenter from "./ShelterAnimalListPresenter";
import axios from "axios";
function ShelterAnimalListContainer() {

  return (
    <div>
      <ShelterAnimalListPresenter></ShelterAnimalListPresenter>
    </div>
  );
}

export default ShelterAnimalListContainer;
