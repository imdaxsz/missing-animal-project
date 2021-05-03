import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Card, Row, Col,Form } from "react-bootstrap";
import { BiMap } from "react-icons/bi";
import { Link } from "react-router-dom";
import Masonry from 'react-masonry-css'
import "./ShelterAnimal.css"
function ShelterAnimalListPresenter({ ShelterAnimalData , AreaSelectChange }) {
  return (
    <div className="wrapper">
      <h3>보호소 보호 동물</h3>
      <Form.Group controlId="exampleForm.SelectCustomSizeLg">
        <Form.Label>지역 설정</Form.Label>
        <Form.Control as="select" size="lg" custom onChange={(e)=>{AreaSelectChange(e.target.value)}}>
          <option>전체</option>
          <option>경상북도</option>
          <option>전라북도</option>
          <option>강원도</option>
          <option>서울특별시</option>
        </Form.Control>
      </Form.Group>
      <SearchBar />
      <Masonry breakpointCols={2} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {ShelterAnimalData.map(function (animal, index) {
          return (
              <Link to="/animal_detail" key={index}>
                <AnimalCard animal={animal} index={index}></AnimalCard>
              </Link>
          );
        })}
      </Masonry>
    </div>
  );
}

function AnimalCard({ animal }) {
  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Img variant="top" src={animal.popfile} />
        <Card.Body>
          <Card.Title>
            <strong>[공고]</strong>
            {animal.kindCd.split("]")[1]}
          </Card.Title>
          <Card.Text>
            {animal.kindCd.split("[")[1].split("]")[0]} |{" "}
            {animal.sexCd === "F" ? "암컷" : "수컷"}
          </Card.Text>
          <Card.Text>
            {animal.happenDt
              .toString()
              .replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")}
          </Card.Text>

          <Card.Text>
            <BiMap />
            {animal.orgNm}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
export default ShelterAnimalListPresenter;
