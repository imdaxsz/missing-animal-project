import "./Main.css";
import styled from "styled-components";
import { Card, Row, Col } from "react-bootstrap";

const CardContainer = styled.div`
  width: 50%;
  background-color: red;
  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  &.inner {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

function Main() {
  return (
    <div>
      <Row md={2} xs={2} xl={2} lg={2}>
        <Col>
          <AnimalCard></AnimalCard>
        </Col>
        <Col>
          <AnimalCard></AnimalCard>
        </Col>
        <Col>
          <AnimalCard></AnimalCard>
        </Col>
        <Col>
          <AnimalCard></AnimalCard>
        </Col>
        <Col>
          <AnimalCard></AnimalCard>
        </Col>
      </Row>
    </div>
  );
}

function AnimalCard() {
  return (
    <>
      <Card style={{ marginBottom: '10px' }}>
        <Card.Img
          variant="top"
          src="https://file.mk.co.kr/meet/neds/2020/07/image_readtop_2020_676504_15936496204262518.jpg"
        />
        <Card.Body>
          <Card.Title><strong>[목격]</strong>코리안 숏헤어</Card.Title>
          <Card.Text>
            미확인/5살/4kg
          </Card.Text>
          <Card.Text>
            2021-03-13
          </Card.Text>
          <Card.Text>
            경북 구미시
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Main;
