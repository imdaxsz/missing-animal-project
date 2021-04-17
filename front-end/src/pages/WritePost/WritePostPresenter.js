import React from "react";
import styled from "styled-components";
import { Form, Row, Col, Button } from "react-bootstrap";
import {
  AiOutlineMan,
  AiOutlineWoman,
  AiOutlineQuestion,
} from "react-icons/ai";

const StyledTextInput = styled.input`
  background-color: rgba(0, 0, 0, 0.3);
`;
const StyledTextLabel = styled.span`
  padding-right: 10px;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  &:active,
  &:hover {
    background-color: #00a059;
    color: white;
    font-weight: bold;
  }
`;

const PostWriteButton = styled.button`
  color: white;
  font-weight: bold;
  text-align: center;
  background-color: #00a059;
  z-index: 10;
  border: none;
  height: 40px;
  position: fixed;
  bottom: 0;
  &:hover {
    background-color: #30b87b;
  }
  max-width: 500px;
  width: 100%;
`;
function WritePostPresenter() {
  return (
    <div>
      <div className="wrapper">
        <h3>새 게시글 작성</h3>
        <hr />
        <div>
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              제목
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="게시글 제목을 입력하세요"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2} xs={12}>
              게시글 종류
            </Form.Label>
            <Col sm={3} xs={4}>
              <StyledButton>실종 신고</StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton>임시 보호</StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton>목격 제보</StyledButton>
            </Col>
          </Form.Group>

          <hr />
          <Form.Group as={Row} controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              품종
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="ex. 코리안숏헤어, 닥스훈트, 모란앵무.."
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2} xs={12}>
              성별
            </Form.Label>
            <Col sm={3} xs={4}>
              <StyledButton>
                <AiOutlineMan />
                수컷
              </StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton>
                <AiOutlineWoman />
                암컷
              </StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton>
                <AiOutlineQuestion />
                미확인
              </StyledButton>
            </Col>
          </Form.Group>
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
              <Form.Control
                type="text"
                placeholder="동물의 털색을 입력하세요"
              />
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
                  <option>경상북도</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Col>
              <Col sm={5}>
                <Form.Control as="select" custom>
                  <option>구미시</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                상세 장소
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="목격하신 장소의 상세 위치를 적어주세요"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                연락처
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="text" placeholder="ex. 010-0000-0000" />
              </Col>
            </Form.Group>
            <hr />
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                본문
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="덧붙일 본문을 적어주세요."
                />
              </Col>
            </Form.Group>
            <hr />
            <p>사진 첨부파일 등록 칸 예정</p>
          </div>
        </div>
      </div>
      <PostWriteButton>작성완료</PostWriteButton>
    </div>
  );
}

export default WritePostPresenter;
