import React, { useState } from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import PopularProducts from "../components/PopularProducts";
import styled from "styled-components";
import { Fab } from "@mui/material";
import { Add, NavigationOutlined } from "@mui/icons-material";
import ChatModal from "../components/ChatModal";
import SearchText from "../components/SearchText";
import { mobile } from "../components/responsive";
import { useSelector } from "react-redux";

// const Sticky = styled.div`
//   position: sticky;
//   top: 0;
// `;
const Home = () => {
  const [modalOpen, setmodalOpen] = useState(false);

  const showModal = () => {
    setmodalOpen(true);
  };

  return (
    <>
      <Announcement />
      {/* <Sticky> */}
      <Navbar />
      {/* </Sticky> */}

      <Slider />
      {/* <SearchText /> */}
      <Categories />
      <SearchText />
      <PopularProducts />
      <Newsletter />
      <Footer />
      {/* <Fab
        onClick={showModal}
        color="primary"
        aria-label="add"
        variant="챗봇에게 물어봐"
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
      >
        <Add />
      </Fab> */}
      <MyFab
        className="chatting"
        onClick={showModal}
        variant="extended"
        size="primary"
        // color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: "10px", right: "10px" }}
      >
        {/* <NavigationOutlined sx={{ mr: 1 }} /> */}
        <img className="img" src="https://img.icons8.com/nolan/64/bot.png" />
        <span className="chatbot">챗봇에게 물어봐</span>
      </MyFab>
      {modalOpen && <ChatModal setmodalOpen={setmodalOpen} />}
    </>
  );
};

const MyFab = styled(Fab)`
  position: fixed;
  bottom: 10px;
  right: 10px;
`;

export default Home;
