import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import {
  AiOutlineMan,
  AiOutlineWoman,
  AiOutlineQuestion,
} from "react-icons/ai";
import { FaDog, FaCat } from "react-icons/fa";

const StyledLabel = styled.p`
  margin-bottom: 0 !important;
`;
const StyledTextInput = styled.input`
  width: 100%;
  padding-left: 10px;
  height: 40px;
  border: 1px solid lightgrey;
  border-radius: 5px;
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

function WritePostPresenter({
  createPost,
  selectPostType,
  postType,
  setTitle,
  setClassificaton,
}) {
  return (
    <div>
      <div className="wrapper">
        <h3>새 게시글 작성</h3>
        <hr />
        <div>
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>제목</StyledLabel>
            </Col>
            <Col sm={10}>
              <StyledTextInput
                type="email"
                placeholder="게시글 제목을 입력하세요"
                onClick={(e) => {
                  setTitle(e.target.value);
                }}
              ></StyledTextInput>
            </Col>
          </Row>
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>게시글 종류</StyledLabel>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton
                value="실종신고"
                onClick={(e) => {
                  selectPostType(e.target.value);
                }}
              >
                실종 신고
              </StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton
                value="임시보호"
                onClick={(e) => {
                  selectPostType(e.target.value);
                }}
              >
                임시 보호
              </StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton
                value="목격제보"
                onClick={(e) => {
                  selectPostType(e.target.value);
                }}
              >
                목격 제보
              </StyledButton>
            </Col>
          </Row>
          <hr />
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>품종</StyledLabel>
            </Col>
            <Col sm={10}>
              <StyledTextInput placeholder="ex. 코리안숏헤어, 닥스훈트, 모란앵무.."></StyledTextInput>
            </Col>
          </Row>
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>성별</StyledLabel>
            </Col>
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
          </Row>
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>동물 분류</StyledLabel>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton>
                <FaDog />개
              </StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton>
                <FaCat />
                고양이
              </StyledButton>
            </Col>
            <Col sm={3} xs={4}>
              <StyledButton>
                <AiOutlineQuestion />
                기타
              </StyledButton>
            </Col>
          </Row>
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>나이</StyledLabel>
            </Col>
            <Col sm={4}>
              <StyledTextInput type="number" placeholder="동물의 나이" />
            </Col>
            <Col sm={2}>몸무게</Col>
            <Col sm={4}>
              <StyledTextInput type="number" placeholder="동물의 몸무게" />
            </Col>
          </Row>

          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>특징</StyledLabel>
            </Col>
            <Col sm={10}>
              <StyledTextInput
                type="text"
                placeholder="눈에띄는 동물의 특징을 입력하세요"
              />
            </Col>
          </Row>
          <hr />
          {postType === "목격제보" ? (
            <div>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>목격 일시</Col>
                <Col sm={10}>
                  <StyledTextInput type="date" />
                </Col>
              </Row>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>목격 지역</Col>
                <Col sm={5}>
                  <select style={{ width: "100%" }}>
                    <option>경상북도</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </Col>
                <Col sm={5}>
                  <select style={{ width: "100%" }}>
                    <option>구미시</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>상세 장소</Col>
                <Col sm={10}>
                  <StyledTextInput
                    type="text"
                    placeholder="목격하신 장소의 상세 위치를 적어주세요"
                  />
                </Col>
              </Row>
            </div>
          ) : null}
          {postType === "실종신고" ? (
            <div>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>실종 일시</Col>
                <Col sm={10}>
                  <StyledTextInput type="date" />
                </Col>
              </Row>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>실종 지역</Col>
                <Col sm={5}>
                  <select style={{ width: "100%" }}>
                    <option>경상북도</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </Col>
                <Col sm={5}>
                  <select style={{ width: "100%" }}>
                    <option>구미시</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>상세 장소</Col>
                <Col sm={10}>
                  <StyledTextInput
                    type="text"
                    placeholder="실종된 장소의 상세 위치를 적어주세요"
                  />
                </Col>
              </Row>
            </div>
          ) : null}
          {postType === "임시보호" ? (
            <div>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>발견 일시</Col>
                <Col sm={10}>
                  <StyledTextInput type="date" />
                </Col>
              </Row>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>발견 지역</Col>
                <Col sm={5}>
                  <select style={{ width: "100%" }}>
                    <option>경상북도</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </Col>
                <Col sm={5}>
                  <select style={{ width: "100%" }}>
                    <option>구미시</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3" style={{ alignItems: "center" }}>
                <Col sm={2}>상세 장소</Col>
                <Col sm={10}>
                  <StyledTextInput
                    type="text"
                    placeholder="발견된 장소의 상세 위치를 적어주세요"
                  />
                </Col>
              </Row>
            </div>
          ) : null}

          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>연락처</StyledLabel>
            </Col>
            <Col sm={10}>
              <StyledTextInput type="text" placeholder="ex. 010-0000-0000" />
            </Col>
          </Row>
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>본문</StyledLabel>
            </Col>
            <Col sm={10}>
              <textarea
                as="textarea"
                rows={3}
                placeholder="덧붙일 본문을 적어주세요."
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row className="mb-3" style={{ alignItems: "center" }}>
            <Col sm={2}>
              <StyledLabel>사진 첨부</StyledLabel>
            </Col>
            <Col sm={10}>
              <input multiple type="file" />
            </Col>
          </Row>
        </div>
      </div>
      <PostWriteButton onClick={createPost}>작성완료</PostWriteButton>
    </div>
  );
}

export default WritePostPresenter;
