import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 100%;
  height: 200px;
`;
const ProductUpload = () => {
  const [imgsrc, setimgsrc] = useState("");
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [cat, setcat] = useState("");
  const [price, setprice] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const fileUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(
        "http://13.124.237.66:5000/api/products/image/upload",
        formData
      );
      setimgsrc(res.data.filePath);
    } catch (e) {}
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!(title || desc || cat || price)) {
      return alert("모든항목을 입력해주세요");
    }
    try {
      const body = {
        title: title,
        desc: desc,
        img: imgsrc,
        categories: cat,
        price: price,
        userNum: user.userNum,
      };
      const res = await axios.post(
        "http://13.124.237.66:5000/api/products/submit",
        body
      );
      if (res.data.success) {
        alert("상품등록이 완료되었습니다");
        navigate("/");
      }
    } catch (e) {}
  };
  return (
    <>
      <Announcement />
      <Navbar />
      <Container>
        <TextField
          id="outlined-basic"
          label="판매할 제품명을 입력해주세요"
          variant="outlined"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          id="outlined-basic"
          label="판매할 제품에 대한 간단한 설명을 해주세요 ex)제품보존상태 "
          variant="outlined"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />

        <Input type="file" onChange={fileUpload} />
        <Image src={`http://13.124.237.66:5000/${imgsrc}`} />

        <TextField
          style={{ marginTop: 20 }}
          id="outlined-basic"
          label="학과명을 입력해주세요 ex)컴퓨터과 "
          variant="outlined"
          value={cat}
          onChange={(e) => setcat(e.target.value)}
        />
        <TextField
          style={{ marginTop: 20 }}
          id="outlined-basic"
          label="판매가격을 입력해주세요 "
          variant="outlined"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          style={{ marginTop: 20 }}
          onClick={handleClick}
        >
          제품을 등록하시겠습니까?
        </Button>
      </Container>
    </>
  );
};

export default ProductUpload;
