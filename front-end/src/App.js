import styled from "styled-components";
import Main from "./pages/Main/MainPresenter.js";
import Header from "./components/Header/HeaderContainer";
import MainMenu from "./components/MainMenu/MainMenuContainer";
import WriteButton from './components/WriteButton/WriteButtonContainer'
const FixedWidth = styled.div`
  margin: 0 auto;
  z-index: 1;
  max-width: 550px;
  background-color:white;
`;
const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 0;
`;

const Body = styled.div`
  padding: 0 15px 0 15px;
  background-color: white;
  position:relative;
  top:130px;
  height:100vh;
`;

function App() {
  return (
    <div className="App">
      <Background>
        <FixedWidth>
          <Header></Header>
          <MainMenu></MainMenu>
          <Body>
            <Main></Main>
          </Body>
          <WriteButton></WriteButton>
        </FixedWidth>
      </Background>
    </div>
  );
}

export default App;
