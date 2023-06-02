import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import "./Slider.css";
import styled from "styled-components";
import { sliderItems } from "../data";
import axios from "axios";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const Slider = () => {
  const [slideIndex, setslideIndex] = useState(0);
  const [imgurl, setimgurl] = useState([]);

  const imgages = ["img1.svg", "img2.svg", "img3.svg"];

  useEffect(() => {
    getSlideimg();
  }, []);

  const getSlideimg = async () => {
    const res = await axios.get(" http://localhost:5000/api/slider");
    setimgurl(res.data);
  };

  useEffect(() => {
    const sliderLoop = setTimeout(() => {
      setslideIndex(() => {
        if (slideIndex < imgurl.length - 1) {
          setslideIndex(slideIndex + 1);
        } else setslideIndex(0);
      });
    }, 3000);

    return () => clearTimeout(sliderLoop);
  }, [slideIndex]);

  const handleClick = (direction) => {
    if (direction === "left") {
      setslideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setslideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <div className="slider">
      <div className="slider-left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <Wrapper slideIndex={slideIndex}>
        {imgages.map((item, index) => (
          <Slide key={index}>
            <div className="imgContainer">
              <img src={`/images/${item}`} alt="" />
            </div>
          </Slide>
        ))}
      </Wrapper>
      <div className="slideNum">
        <span>{parseInt(slideIndex) + 1 + "/" + imgurl.length}</span>
      </div>
      <div className="slider-right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
