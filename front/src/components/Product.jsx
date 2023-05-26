import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import axios from "axios";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { mobile } from "./responsive";
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 23vw;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
`;

const Image = styled.img`
  width: 60%;
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item, no }) => {
  const { username } = useSelector((state) => state.user);
  console.log(item);
  const handlelikers = async () => {
    try {
      const body = {
        username: username,
        _id: item._id,
      };
      const res = await axios.post(
        " http://localhost:5000/api/users/addlikers",
        body
      );
      if (res.data.success) {
        alert("상품찜 완료");
      } else {
        alert("상품찜 실패");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeLikers = async () => {
    try {
      const body = {
        username: username,
        _id: item._id,
      };
      const res = await axios.post(
        " http://localhost:5000/api/users/removelikers",
        body
      );
      if (res.data.success) {
        alert("찜한상품삭제");
      } else {
        alert("찜한상품삭제실패");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Circle />

      <Image src={`http://localhost:5000/${item.img}`} />
      {no ? null : (
        <Info>
          <Icon>
            <HeartBrokenIcon onClick={removeLikers} />
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            <FavoriteBorderOutlined onClick={handlelikers} />
          </Icon>
        </Info>
      )}
    </Container>
  );
};

export default Product;
