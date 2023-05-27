import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/userRedux";
import axios from "axios";
import { mobile } from "../components/responsive";
import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("data:image/png;base64,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")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const MyButton = styled(Button)`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Sign = styled.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
  color: black;
`;

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = {
        email: email,
        password: password,
      };

      const res = await axios.post(
        "http://13.209.10.47:5000/api/auth/login",
        body
      );
      // const res = await axios.post(
      //   "http://13.209.10.47:5000/api/auth/login",
      //   body
      // );
      if (res.data.success) {
        console.log(res.data);
        localStorage.setItem("token", res.data.accessToken);
        dispatch(login(res.data));
        navigate("/");
      }
    } catch (e) {}
  };

  return (
    <Container>
      <Wrapper>
        <Title>로그인</Title>
        <Form>
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
            onClick={handleLogin}
          >
            로그인
          </MyButton>

          <MyButton
            style={{ marginTop: "20px" }}
            variant="contained"
            endIcon={<Send />}
            onClick={handleClick}
          >
            회원가입
          </MyButton>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
