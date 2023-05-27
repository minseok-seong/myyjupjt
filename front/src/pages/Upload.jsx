import React, { useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
const Container = styled.div`
  margin-top: 20px;
  width: 100%;
`;
const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;

  .title {
    width: 100%;
    padding-left: 10px;
    font-size: 30px;
  }
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Image = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Button = styled.button`
  margin-top: 10px;
  display: flex;
`;
const Upload = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  console.log(user);
  const handleClick = async (e) => {
    e.preventDefault();

    if (title === "" || desc === "") {
      return alert("모든 항목을 채워주세요!");
    }

    const content = {
      title: title,
      desc: desc,
      image: image,
      uNum: user.userNum,
    };
    try {
      const res = await axios.post(
        "http://13.124.237.66:5000/api/post/submit",
        content
      );
      if (res.data.success) {
        alert("글 작성이 완료되었습니다");
        navigate("/community");
      } else {
        alert("글 작성이 실패하였습니다");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fileUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(
        "http://13.124.237.66:5000/api/post/image/upload",
        formData
      );
      setimage(res.data.filePath);
    } catch (e) {}
  };

  console.log(desc);
  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <Wrapper>
          <Title>제목</Title>
          <input
            className="title"
            type="text"
            placeholder="제목을 입력"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <Image>이미지업로드</Image>
          {/* 사용자가 이미지를 업로드
          업로드 한 이미지를 받아서 서버에서 저장
          저장한 이미지 경로를 다시 클라이언트에게 전송
          경로를 받아서 post model에 저장  */}
          <input
            className="desc"
            type="file"
            placeholder="이미지 업로드"
            onChange={fileUpload}
          />
          <Desc>내용</Desc>
          <TextField
            style={{ width: "100%" }}
            onChange={(e) => setdesc(e.target.value)}
          />
          <Button onClick={handleClick}>제출</Button>
        </Wrapper>
      </Container>
    </>
  );
};

export default Upload;
