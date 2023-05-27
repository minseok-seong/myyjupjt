import { Add, Chat, Remove } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import { mobile } from "../components/responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  ${mobile({ marginBottom: "20px" })}
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: fill;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const User = styled.h3`
  margin-left: 20px;
  margin-right: 20px;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setproduct] = useState({});
  const [quantity, setquantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleContact = async () => {
    const sellerId = product.author._id;
    const buyerId = user.uId;
    const id = sellerId + buyerId;

    try {
      const res = await axios.get(
        `http://13.124.237.66:5000/api/conversations/single/${id}`
      );
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axios.post(
          `http://13.124.237.66:5000/api/conversations/`,
          {
            id: id,
            sellerId: sellerId,
            buyerId: buyerId,
          }
        );
        navigate(`/message/${res.data.id}`);
      }
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://13.124.237.66:5000/api/products/find/${id}`
        );
        setproduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setquantity(quantity - 1);
    } else {
      setquantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={`http://13.124.237.66:5000/${product.img}`} />
        </ImgContainer>
        <InfoContainer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar>{product.author?.username}</Avatar>
            <User>{`판매자 : ${product.author?.username}`}</User>
            <IconButton
              onClick={handleContact}
              aria-label="add to shopping cart"
              style={{ color: "green" }}
            >
              <Chat style={{ marginRight: "5px" }} /> 문의
            </IconButton>
          </div>

          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price} won</Price>

          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
