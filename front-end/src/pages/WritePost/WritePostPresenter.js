import React from "react";
import styled from "styled-components";
import { Form, Row, Col, Button } from "react-bootstrap";

const StyledTextInput = styled.input`
  background-color: rgba(0, 0, 0, 0.3);
`;
const StyledTextLabel = styled.span`
  padding-right: 10px;
`;
function WritePostPresenter() {
  return (
    <div className="wrapper">
      <h3>새 게시글 작성</h3>
      <hr />
      <Form>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            제목
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="게시글 제목을 입력하세요" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            게시글 종류
          </Form.Label>
          <Col sm={10}>
            <Button>실종 신고</Button>
            <Button>목격 제보</Button>
            <Button>임시 보호</Button>
          </Col>
        </Form.Group>

        <hr />
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            동물종류
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="ex. 코리안숏헤어, 닥스훈트, 모란앵무.."
            />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              성별
            </Form.Label>
            <Col sm={10}>
              <Form.Check inline type="radio" label="수컷" />
              <Form.Check inline type="radio" label="암컷" />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            나이
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="number" placeholder="동물의 나이" />
          </Col>
          <Form.Label column sm={2}>
            몸무게
          </Form.Label>
          <Col sm={4}>
            <Form.Control type="number" placeholder="동물의 몸무게" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            털색
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="동물의 털색을 입력하세요" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            특징
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="눈에띄는 동물의 특징을 입력하세요"
            />
          </Col>
        </Form.Group>

        <hr />

        <div>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              목격 일시
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="date" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              목격 지역
            </Form.Label>
            <Col sm={5}>
              <Form.Control as="select" custom>
                <option value="" disabled selected>
                  시/도
                </option>
                <option>서울특별시</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Col>
            <Col sm={5}>
              <Form.Control as="select" custom>
                <option value="" disabled selected>
                  시/군/구
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </div>
      </Form>
    </div>
  );
}

export default WritePostPresenter;
