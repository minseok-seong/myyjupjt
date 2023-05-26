import React from "react";
import styled from "styled-components";
import ChatBot from "react-simple-chatbot";
import { basicSteps } from "../data";
import CancelIcon from "@mui/icons-material/Cancel";
import { mobile } from "./responsive";

const Container = styled.div`
  width: auto;
  height: auto;
  z-index: 10000;
  position: fixed;
  bottom: 0;
  right: 10px;
  background-color: white;
  ${mobile({ right: "10px", width: "70%" })}
`;

const Title = styled.h3`
  padding: 10px;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  top: 13px;
  color: purple;
  border: none;
  z-index: 1000000;
`;
const ChatModal = ({ setmodalOpen }) => {
  const closeModal = () => {
    setmodalOpen(false);
  };
  return (
    <Container>
      <Button onClick={closeModal}>
        <CancelIcon />
      </Button>
      <ChatBot
        steps={basicSteps}
        placeholder={"궁금한걸 물어보세요."}
        headerTitle="챗봇에게 궁금한걸 물어봥~"
      />
    </Container>
  );
};

export default ChatModal;
