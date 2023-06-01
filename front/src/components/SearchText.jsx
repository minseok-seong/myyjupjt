import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "./responsive";

const SearchText = () => {
  const [cat, setcat] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    navigate(`/products/${cat}`);
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleInput()}>
        <Input
          value={cat}
          onChange={(e) => setcat(e.target.value)}
          type="text"
          placeholder="학과를 입력하세요 ex)컴퓨터과"
        ></Input>
        <Search />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 756px;
  margin: 0 auto;
  border: 1px solid gainsboro;
  margin-bottom: 20px;
  &:hover {
    background: #e9f5f5;
  }
  ${mobile({ maxWidth: "312px" })}
`;
const Form = styled.form`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 700px;
  height: 50px;
  border: none;
  outline: none;
  padding-left: 20px;
  &:hover {
    background: #e9f5f5;
  }
`;

export default SearchText;
