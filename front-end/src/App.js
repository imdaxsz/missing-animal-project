import styled from "styled-components";
import Main from "./pages/Main/MainContainer";
import WritePost from "./pages/WritePost/WritePostContainer";
import UpdatePost from "./pages/UpdatePost/UpdatePostContainer";
import Header from "./components/Header/HeaderContainer";
import MainMenu from "./components/MainMenu/MainMenuContainer";
import ShelterAnimalList from "./pages/Shelter/ShelterAnimalListContainer";
import AnimalDetailView from "./pages/AnimalDetailView/AnimalDetailViewContainer";
import ShelterAnimalDetailView from "./pages/ShelterAnimalDetailView/ShelterAnimalDetailViewContainer";
import UserPage from "./pages/UserPage/UserPageContainer";
import ShelterrInfo from "./pages/ShelterInfo/ShelterInfoContainer";
import { createGlobalStyle } from "styled-components";
import { Link, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
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
  a{
    color:inherit;
    text-decoration:none;
    &.hover{
      text-decoration:none;
    }
    
  }
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <MainMenu />
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/writePost">
        <WritePost />{" "}
      </Route>
      <Route path="/shelter">
        <ShelterAnimalList />{" "}
      </Route>
      <Route path="/animal_detail">
        <AnimalDetailView />
      </Route>
      <Route path="/shelter_animal_detail">
        <ShelterAnimalDetailView />
      </Route>
      <Route path="/user_page">
        <UserPage />
      </Route>
      <Route path="/shelter_info">
        <ShelterrInfo />
      </Route>
      <Route path="/updatePost">
        <UpdatePost/>
      </Route>
    </>
  );
}
export default App;
