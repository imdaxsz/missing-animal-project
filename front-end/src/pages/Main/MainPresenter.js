import './Main.css';
import styled from "styled-components";


const CardContainer = styled.div`
  width:50%;
  background-color:red;
  &::after{
    content:"";
    display:block;
    padding-bottom:100%;
  }
  &.inner {
    position:absolute;
    width:100%;
    height:100%;
  }
`

function Main() {
  return (
    <div>
      <AnimalCard></AnimalCard>
    </div>
  );
}

function AnimalCard(){
  return (
    <>
      <div>
        <CardContainer>test</CardContainer>
      </div>
    </>
  )
}


export default Main;
