import { Send } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import Question from "./Question";
import { mobile } from "./responsive";
import { useSelector } from "react-redux";

const News = styled.div`
  position: relative;
`;
const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ textAlign: "center" })}
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;
const Input = styled.input`
  border: none;
  outline: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: pink;
  color: white;
`;
const Newsletter = () => {
  const [question, setquestion] = useState(false);
  const user = useSelector((state) => state.user);

  const handleX = () => {
    setquestion(false);
  };

  const handleButton = () => {
    if (!user?.uId) {
      alert("로그인해 주새요");
      return;
    }
    setquestion(true);
  };
  return (
    <News>
      <Container>
        <Title>관리자에게 문의</Title>
        <Desc>관리자에게 문의가 필요하다면 바로아래!! 아이콘 Click</Desc>
        <InputContainer>
          <Input placeholder="오른쪽 버튼을 누르면 관리자에게 문의할수 있어여~~" />
          <Button onClick={handleButton}>
            <Send />
          </Button>
        </InputContainer>
      </Container>
      {question && <Question handleX={handleX} />}
    </News>
  );
};

export default Newsletter;
