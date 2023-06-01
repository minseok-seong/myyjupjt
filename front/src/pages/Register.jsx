import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { mobile } from "../components/responsive";
import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.sisaweek.com/news/photo/202301/202069_202385_5652.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;

  ${mobile({ width: "90%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  ${mobile({ flexDirection: "column" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 20px 0px;
  padding: 10px;
`;

const MyButton = styled(Button)`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: gainsboro;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const body = {
        username: username,
        email: email,
        password: password,
      };
      const res = await axios.post(
        "http://13.124.237.66:5000/api/auth/register",
        body
      );
      if (res.data.success) {
        alert("회원가입성공");
        navigate("/login");
      } else {
        alert("회원가입실패");
      }
    } catch (err) {}
  };
  return (
    <Container>
      <Wrapper>
        <Title>회원가입</Title>
        <Form>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <MyButton
            variant="contained"
            endIcon={<Send />}
            onClick={handleRegister}
          >
            회원가입
          </MyButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
