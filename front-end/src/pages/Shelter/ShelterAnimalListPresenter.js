import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Card , Row, Col } from "react-bootstrap";
import { BiMap } from "react-icons/bi";
import {Link} from 'react-router-dom'

function ShelterAnimalListPresenter({ShelterAnimalData}) {
  
  return (
    <div className="wrapper">
      <h3>보호소 보호 동물</h3>
        <SearchBar/>
        <Row md={2} xs={2} xl={2} lg={2}>
        {ShelterAnimalData.map(function (animal, index) {
            return (
              <Col key={index}>
                <Link to="/animal_detail">
                  <AnimalCard animal={animal} index={index}></AnimalCard>
                </Link>
              </Col>
            );
          })}


        </Row>
    </div>
  );
}

function AnimalCard({animal}) {

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Card.Img
          variant="top"
          src={animal.popfile}
        />
        <Card.Body>
          <Card.Title>
            <strong>[공고]</strong>{animal.kindCd.split("]")[1]}
          </Card.Title>
          <Card.Text>
            {animal.kindCd.split("[")[1].split("]")[0]} | {animal.sexCd==="F" ? "암컷" : "수컷"}
          </Card.Text>
          <Card.Text>{animal.happenDt.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')}</Card.Text>
          
          <Card.Text><BiMap/>{animal.orgNm}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
export default ShelterAnimalListPresenter;
