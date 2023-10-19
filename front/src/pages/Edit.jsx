import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
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
  .desc {
    border: 1px solid gainsboro;
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
  margin-bottom: 10px;
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

export const Edit = () => {
  const [post, setpost] = useState({});
  const postNumber = useParams();
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.post(
          "http://13.124.27.126:5000/api/post/detail",
          postNumber
        );

        if (res.data.success) {
          setpost(res.data.post);
        }
      } catch (e) {}
    };
    getPost();
  }, []);

  useEffect(() => {
    settitle(post.title);
    setdesc(post.content);
    setimage(post.image);
  }, [post]);

  const handleClick = async (e) => {
    e.preventDefault();

    if (title === "" || desc === "") {
      return alert("모든 항목을 채워주세요!");
    }

    const content = { title: title, desc: desc, postNumber, image: image }; //포스트넘버 보내는 이유는 어떤 포스트를 업데이트 해야할지 알려주려고
    try {
      const res = await axios.post(
        "http://13.124.27.126:5000/api/post/edit",
        content
      );
      if (res.data.success) {
        alert("글 수정이 완료되었습니다");
        navigate("/");
      } else {
        alert("글 수정이 실패하였습니다");
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
        "http://13.124.27.126:5000/api/post/image/upload",
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
          <input
            className="desc"
            type="file"
            placeholder="이미지 업로드"
            onChange={fileUpload}
          />
          <Desc>내용</Desc>
          <TextField
            style={{ width: "100%" }}
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
          />
          <Link to={`/post/${postNumber}`}>
            <Button onClick={handleClick}>수정</Button>
          </Link>
        </Wrapper>
      </Container>
    </>
  );
};
//디테일에서 가져온다
