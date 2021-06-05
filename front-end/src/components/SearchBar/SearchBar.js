import React , {useState}from "react";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
const SearchBarContainer = styled.fieldset`
  width: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom:10px;
`;
const IconContainer = styled.div`
  width:10%;
  text-align-last:center;
  color:grey;
`;
const StyledInput = styled.input`
  background-color: none;
  width: 100%;
  height: 40px;
  border:none;
  background-color: rgba(0,0,0,0);
  padding-left:10px;

`;
function SearchBar({searchResult}) {

  const [searchKeyWord , setSearchKeyWord] = useState("")
  const onKeyPress = (e) =>{
    if (e.key == 'Enter'){
      searchResult(searchKeyWord)
    }
  }
  return (
    <>
      <SearchBarContainer>
        <StyledInput type="text" placeholder="검색어를 입력하세요" onChange={(e)=>{setSearchKeyWord(e.target.value)}} onKeyPress={onKeyPress}/>
        <IconContainer><BiSearch size="24" /></IconContainer>
      </SearchBarContainer>
    </>
  );
}

export default SearchBar;
