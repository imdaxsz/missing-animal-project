import { Card, Row, Col } from "react-bootstrap";
import data from "../../data/data.json";
import { useState,useEffect } from "react";
import { BiMap } from "react-icons/bi";
import SearchBar from "../../components/SearchBar/SearchBar";
import WriteButton from "../../components/WriteButton/WriteButtonContainer";
import { Link } from "react-router-dom";
import ip from "../../ipConfig.json";
function MissPresenter({discRescAnimalData,searchResult}) {

  return (
    <div>
      <div className="wrapper">
        <h3>실종동물 신고🚨</h3>
        <SearchBar searchResult={searchResult}/>
        <Row md={2} xs={2} xl={2} lg={2}>
          {discRescAnimalData.map(function (animal, index) {
            return (
              <Col key={index}>
                <Link to={"/animal_detail/"+animal.postType+"/"+animal.postID} >
                  <AnimalCard animal={animal} index={index}></AnimalCard>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>

      <WriteButton />
    </div>
  );
}

function AnimalCard({ animal, index }) {
  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Img
          variant="top"
          src={`${ip['ip']}/static/images/${animal.postImg}`}
        />
        <Card.Body>
          <Card.Title>
            <strong>[{animal.postType}]</strong>
            {animal.breed}
          </Card.Title>
          <Card.Text>
            {animal.sex} | {animal.age} | {animal.weight}{animal.weight === "모름" ? null : "kg"}
          </Card.Text>
          <Card.Text>{animal.lostDate.substr(0,4)}-{animal.lostDate.substr(4,2)}-{animal.lostDate.substr(6,2)}</Card.Text>

          <Card.Text>
            <BiMap />
            {animal.detailPlace}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default MissPresenter;
