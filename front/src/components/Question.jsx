import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import swal from "sweetalert";

const Container = styled.div`
  width: 300px;
  border: 1px solid gainsboro;
  height: auto;
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 100;
  background-color: white;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
`;
const X = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Question = ({ handleX }) => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6hsjunf",
        "template_euxf3hb",
        form.current,
        "h3293qs3qGrF_48EZ"
      )
      .then(
        (result) => {
          swal("전송되었습니다.");
        },
        (error) => {
          swal("실패.");
        }
      );
  };
  return (
    <Container>
      <X onClick={() => handleX()}>X</X>
      <Title>
        <img src="https://img.icons8.com/fluency/48/null/help.png" />
        문의사항을 입력해주세요
      </Title>

      <Form ref={form} onSubmit={sendEmail}>
        <TextField
          name="name"
          id="outlined-basic"
          label="이름"
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <TextField
          name="message"
          id="outlined-multiline-static"
          label="문의사항"
          multiline
          rows={10}
          defaultValue="문의사항을 입력해주세요~"
        />

        <Button
          onClick={sendEmail}
          variant="contained"
          color="success"
          style={{ marginTop: "10px" }}
        >
          문의하기
        </Button>
      </Form>
    </Container>
  );
};

export default Question;
