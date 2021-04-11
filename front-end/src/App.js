import styled from "styled-components";
import Main from "./pages/Main/MainPresenter.js";
import Header from "./components/Header/HeaderContainer";
import MainMenu from "./components/MainMenu/MainMenuContainer";
import WriteButton from "./components/WriteButton/WriteButtonContainer";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    max-width:500px;
    margin: 0 auto;
  }
`;


function App() {
  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <MainMenu></MainMenu>
        <Main></Main>
      <WriteButton></WriteButton>
    </>
  );
}

export default App;
