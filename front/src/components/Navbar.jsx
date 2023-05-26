import { Search, ShoppingBagOutlined } from "@mui/icons-material";
import { Avatar, Badge, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../redux/userRedux";

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
  const [isopen, setisopen] = useState(false);
  const [cat, setcat] = useState("");
  const dispatch = useDispatch();
  const refimg = useRef();
  const refmenu = useRef();
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleInput = (e) => {
    navigate(`/products/${cat}`);
  };

  const hnadleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };
  const onClickAi = () => {
    navigate("/ai");
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== refmenu.current && e.target !== refimg.current) {
        setisopen(false);
      }
    });
    return () => {
      window.removeEventListener("click", (e) => {
        if (e.target !== refmenu.current && e.target !== refimg.current) {
          setisopen(false);
        }
      });
    };
  }, [refimg, refmenu]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="left">
          {/* <span className="language">KO</span> */}
          <img
            onClick={() => navigate("/")}
            className="img"
            src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-university-back-to-school-justicon-lineal-color-justicon-2.png"
          />
          <LinkStyle to="/community">
            <div className="community">커뮤니티</div>
          </LinkStyle>
          <LinkStyle to="/productUpload">
            <div className="community">물건팔기</div>
          </LinkStyle>
          {/* <div className="nav-form">
            <input
              type="text"
              value={cat}
              onChange={(e) => setcat(e.target.value)}
              className="form-control"
              placeholder="학과명을 입력해주세요 ex)컴퓨터과"
            />
            <Search onClick={(e) => handleInput()} />
          </div> */}
        </div>
        <div className="center">
          <LinkStyle className="title" to={"/"}>
            <img
              style={{ objectFit: "contain" }}
              src="https://img.icons8.com/color/48/null/story-book.png"
            />
            <h1 className="logo">영진마켓</h1>
            <img
              style={{ objectFit: "contain" }}
              src="https://img.icons8.com/color/48/null/story-book.png"
            />
          </LinkStyle>
        </div>
        <div className="right">
          <Button onClick={onClickAi} variant="contained" color="success">
            ChatAI
          </Button>
          {user.username ? (
            <div className="dropdown">
              {user.userimg ? (
                <img
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  src={`http://localhost:5000/${user.userimg}`}
                  ref={refimg}
                  onClick={() => setisopen(!isopen)}
                />
              ) : (
                <Avatar ref={refimg} onClick={() => setisopen(!isopen)}>
                  {user.username}
                </Avatar>
              )}

              {isopen && (
                <ul ref={refmenu} className="lists">
                  <li onClick={() => navigate("/mypage")} className="list">
                    내 정보
                  </li>
                  <li onClick={() => navigate("/mypage")} className="list">
                    상품목록
                  </li>
                  <li onClick={() => navigate("/mypage")} className="list">
                    내찜목록
                  </li>
                  <li
                    onClick={() => navigate(`/sellmessage/${user.uId}`)}
                    className="list"
                  >
                    판매메시지
                  </li>
                  <li
                    onClick={() => navigate(`/buyermessage/${user.uId}`)}
                    className="list"
                  >
                    구매메시지
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button className="menuItem" onClick={() => navigate("/register")}>
              회원가입
            </button>
          )}
          {user.username ? (
            <button className="menuItem" onClick={hnadleLogout}>
              로그아웃
            </button>
          ) : (
            <button className="menuItem" onClick={() => navigate("/login")}>
              로그인
            </button>
          )}
          <LinkStyle to="/cart">
            <div className="menuItem">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingBagOutlined />
              </Badge>
            </div>
          </LinkStyle>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
