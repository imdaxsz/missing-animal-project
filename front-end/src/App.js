import styled from "styled-components";
import Main from "./pages/Main/MainContainer";
import Header from "./components/Header/HeaderContainer";
import MainMenu from "./components/MainMenu/MainMenuContainer";
import WriteButton from "./components/WriteButton/WriteButtonContainer";
import { createGlobalStyle } from "styled-components";

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
`;
const Wrapper = styled.div`
  top: 140px;
  position: relative;
  padding-bottom: 100px;
  padding-right: 15px;
  padding-left: 15px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header></Header>
      <MainMenu></MainMenu>
      <Wrapper>
        <Main></Main>
      </Wrapper>

      <WriteButton></WriteButton>
    </>
  );
}

export default App;
