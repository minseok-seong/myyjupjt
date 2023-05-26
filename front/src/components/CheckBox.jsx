import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const CheckBox = () => {
  const handleClick = () => {
    // triggerNextStep({ triggerNextStep: true });
  };
  return (
    <Container>
      <input type="checkbox" />
      좋네요!
      <input type="checkbox" />
      나쁘지 않네요!
      <input type="checkbox" />
      너무 별로에요!
      <button onClick={handleClick}>제출</button>
    </Container>
  );
};

export default CheckBox;
