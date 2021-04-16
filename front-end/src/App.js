import styled from "styled-components";
import Main from "./pages/Main/MainContainer";
import WritePost from "./pages/WritePost/WritePostContainer";
import Header from "./components/Header/HeaderContainer";
import MainMenu from "./components/MainMenu/MainMenuContainer";
import Shelter from "./pages/Shelter/ShelterContainer"
import WriteButton from "./components/WriteButton/WriteButtonContainer";
import { createGlobalStyle } from "styled-components";
import { Link, Route, Switch } from "react-router-dom";
const GlobalStyle = createGlobalStyle`
  body{
    max-width:500px;
    margin: 0 auto;
      
    @font-face {
      font-family: "NanumSquare";
      src: url("./assets/font/NanumSquare_acL.ttf");
    }
    font-family:"NanumSquare"
  }
  .wrapper{
    top: 140px;
    position: relative;
    padding-bottom: 100px;
    padding-left:15px;
    padding-right:15px;
  }
`;
const Wrapper = styled.div`
  top: 140px;
  position: relative;
  padding-bottom: 100px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <MainMenu></MainMenu>
      <Route exact path="/"><Main /></Route>
      <Route path="/writePost"><WritePost/> </Route>
      <Route path="/shelter"><Shelter/> </Route>
    </>
  );
}

export default App;
