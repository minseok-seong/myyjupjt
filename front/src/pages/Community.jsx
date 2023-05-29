import React, { useState, useEffect } from "react";
import { Edit, Search } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import axios from "axios";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useNavigate } from "react-router-dom";
import { Button, Fab } from "@mui/material";
import { height } from "@mui/system";
import { useSelector } from "react-redux";

const UploadDiv = styled.div`
  max-width: 756px;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Upload = styled.span`
  margin-right: 10px;
`;
const SearchDiv = styled.div`
  max-width: 756px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  height: 50px;
  align-items: center;
  margin-bottom: 40px;
`;
const InputDiv = styled.div`
  border: 1px solid gainsboro;
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  padding-left: 5px;
  width: 200px;
  height: 30px;
  outline: none;
`;
const Select = styled.select`
  width: 80px;
  height: 30px;
`;
const Option = styled.option``;
const Btn = styled(Button)`
  width: 160px;
`;
const Community = () => {
  const [postList, setpostList] = useState([]);
  const [sort, setsort] = useState("최신순");
  const [search, setsearch] = useState("");
  const [more, setmore] = useState(0);
  const navigate = useNavigate();
  const [usemore, setusemore] = useState("true");
  const user = useSelector((state) => state.user);

  const handlesort = (e) => {
    setsort(e.target.value);
  };
  const searchhandler = () => {
    getPostList();
  };
  const getPostList = async () => {
    const body = {
      sort: sort,
      search: search,
      // more: more,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/post/list", body);
      setpostList([...res.data.postList]);
      // setmore(more + res.data.postList.length);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getPostList();
  }, [sort]);

  return (
    <>
      <Announcement />
      <Navbar />
      {user?.uId ? (
        <UploadDiv onClick={() => navigate("/upload")}>
          게시글쓰기
          <Fab
            color="secondary"
            aria-label="edit"
            style={{ marginLeft: "10px" }}
          >
            <Edit />
          </Fab>
        </UploadDiv>
      ) : null}
      9
      <SearchDiv>
        <InputDiv>
          <Input
            placeholder="검색어입력"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 13) searchhandler();
            }}
          />
          <Search onClick={searchhandler} />
        </InputDiv>

        <Select onChange={handlesort}>
          <Option>최신순</Option>
          <Option>인기순</Option>
        </Select>
      </SearchDiv>
      <Posts postList={postList} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Btn onClick={() => getPostList()}>더 보기</Btn>
      </div>
    </>
  );
};

export default Community;
