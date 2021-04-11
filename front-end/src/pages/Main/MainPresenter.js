import './Main.css';
import styled from "styled-components";

const TestComponent = styled.div`
  background-color:red;
  height:1000px;
`

function Main() {
  return (
    <div>
      <TestComponent></TestComponent>
    </div>
  );
}

export default Main;
