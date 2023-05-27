import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Product from "./Product";

const Wrapper = styled.div`
  border: 1px solid gainsboro;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  position: relative;
  justify-content: space-between;
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
const MyProducts = () => {
  const [products, setproducts] = useState([]);
  const { username } = useSelector((state) => state.user);

  useEffect(() => {
    getMyProducts();
  }, []);

  const getMyProducts = async () => {
    const body = {
      username: username,
    };
    try {
      const res = await axios.post(
        "http://13.209.10.47:5000/api/products/myProducts",
        body
      );
      //   console.log(res.data);
      setproducts(res.data.products);
    } catch (e) {}
  };

  return (
    <Wrapper>
      <TitleDiv>
        <Title>등록한 상품</Title>
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

export default MyProducts;
