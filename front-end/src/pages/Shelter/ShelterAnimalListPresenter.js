import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Card , Row, Col } from "react-bootstrap";
import { BiMap } from "react-icons/bi";

function ShelterAnimalListPresenter() {
  
  return (
    <div className="wrapper">
      <h3>보호소 보호 동물</h3>
        <SearchBar/>
        <Row md={2} xs={2} xl={2} lg={2}>
            <Col >
                <AnimalCard></AnimalCard>
            </Col>
            <Col >
                <AnimalCard></AnimalCard>
            </Col>
            <Col >
                <AnimalCard></AnimalCard>
            </Col>
            <Col >
                <AnimalCard></AnimalCard>
            </Col>
            <Col >
                <AnimalCard></AnimalCard>
            </Col>

        </Row>
    </div>
  );
}

function AnimalCard() {

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Img
          variant="top"
          src={require(`../../assets/images/abandoned_animal_1.JPG`).default}
        />
        <Card.Body>
          <Card.Title>
            <strong>[공고]</strong>골든 리트리버
          </Card.Title>
          <Card.Text>
            개 | 수컷
          </Card.Text>
          <Card.Text>2021-03-12</Card.Text>
          
          <Card.Text><BiMap/>경기 남양주</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
export default ShelterAnimalListPresenter;
