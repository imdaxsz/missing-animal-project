import { Card, Row, Col } from "react-bootstrap";
import data from "../../data/data.json";
import { useState } from "react";
import { BiMap } from "react-icons/bi";
import SearchBar from '../../components/SearchBar/SearchBar'

function MainPresenter() {
  return (
    <div>
      <SearchBar/>
      <Row md={2} xs={2} xl={2} lg={2}>
        {data.map(function (animal, index) {
          return (
            <Col key={index}>
              <AnimalCard animal={animal} index={index}></AnimalCard>
            </Col>
          );
        })}
      </Row>

      
    </div>
  );
}

function AnimalCard({ animal, index }) {
  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Img
          variant="top"
          src={require(`../../assets/images/animal${index + 1}.JPG`).default}
        />
        <Card.Body>
          <Card.Title>
            <strong>[{animal.type}]</strong>
            {animal.species}
          </Card.Title>
          <Card.Text>
            {animal.sex} | {animal.age}
            {animal.age === "모름" ? null : "살"} | {animal.weight}
            {animal.weight === "모름" ? null : "kg"}
          </Card.Text>
          <Card.Text>{animal.missingDate}</Card.Text>
          <BiMap />
          <Card.Text>{animal.missingLocate}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default MainPresenter;
