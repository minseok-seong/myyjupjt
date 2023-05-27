import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { mobile } from "./responsive";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const PopularProducts = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    getPopularProducts();
  }, []);

  const getPopularProducts = async () => {
    try {
      const res = await axios.get("http://13.209.10.47:5000/api/products");
      // const res = await axios.get("http://13.209.10.47:5000/api/products");
      setproducts(res.data);
    } catch (e) {}
  };

  return (
    <>
      <TitleDiv>
        <Title>오늘의 HOT상품</Title>
      </TitleDiv>

      <Container>
        {products.slice(0, 8).map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </Container>
    </>
  );
};

export default PopularProducts;
