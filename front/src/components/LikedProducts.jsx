import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./Product";

const Wrapper = styled.div`
  border: 1px solid gainsboro;
  margin-top: 20px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;
  position: relative;
`;

const TitleDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const Left = styled.div`
  width: 50px;
  height: 50px;
  background-color: gainsboro;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10px;
  top: 50%;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Right = styled.div`
  width: 50px;
  height: 50px;
  background-color: gainsboro;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 10px;
  top: 50%;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const LikedProducts = () => {
  const [products, setproducts] = useState([]);
  const like = [];
  const { username } = useSelector((state) => state.user);

  useEffect(() => {
    getLikedProducts();
  }, []);

  const getLikedProducts = async () => {
    try {
      const body = {
        username: username,
      };
      const res = await axios.post(
        "http://13.124.237.66:5000/api/products/liked",
        body
      );
      //   console.log(...res.data);
      //   like.push(res.data[0])
      setproducts(res.data);
      //   setproducts(res.data[1]);
    } catch (e) {}
  };

  return (
    <Wrapper>
      <TitleDiv>
        <img
          src="https://img.icons8.com/office/16/null/novel--v1.png"
          style={{ objectFit: "contain", with: "30px" }}
        />
        <Title>찜한 상품</Title>
        <img
          src="https://img.icons8.com/office/16/null/novel--v1.png"
          style={{ objectFit: "contain", with: "30px" }}
        />
      </TitleDiv>

      <Container>
        <Left>
          <ArrowLeftOutlined />
        </Left>
        {products.slice(0, 8).map((item) => (
          <Product item={item} key={item._id} no="no" />
        ))}
        <Right>
          <ArrowRightOutlined />
        </Right>
      </Container>
    </Wrapper>
  );
};

export default LikedProducts;
