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
const Wrapper = styled.div`
  top:140px;
  position:relative;
  padding-bottom:100px;
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
