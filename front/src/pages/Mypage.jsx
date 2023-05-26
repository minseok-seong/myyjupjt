import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import LikedProducts from "../components/LikedProducts";
import MyProducts from "../components/MyProducts";
import Navbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";

const Container = styled.div``;

const Mypage = () => {
  return (
    <>
      <Announcement />
      <Navbar />
      <UserProfile />
      <MyProducts />
      <LikedProducts />

      <Footer />
    </>
  );
};

export default Mypage;
