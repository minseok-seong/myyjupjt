import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { adduserimg } from "../redux/userRedux";
const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  border: 1px solid gainsboro;
  height: 300px;
`;
const Wrapper = styled.div`
  display: flex;
`;
const UserImg = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const UserInfo = styled.div`
  flex: 1;
  height: 300px;
`;
const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const [userimg, setuserimg] = useState("");
  const dispatch = useDispatch();

  const fileUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const res = await axios.post(
        "http://13.209.10.47:5000/api/users/image/upload",
        formData
      );
      setuserimg(res.data.filePath);
    } catch (e) {}
  };
  const imgupload = async () => {
    const body = {
      username: user.username,
      userimg: userimg,
    };
    const res = await axios.post(
      "http://13.209.10.47:5000/api/users/set/image",
      body
    );
    if (res.data.success) {
      console.log(userimg);
      dispatch(adduserimg({ userimg }));
      alert("이미지 업로드 성공");
    } else {
      alert("이미지 업로드 실패");
    }
  };
  return (
    <Container>
      <Wrapper>
        <UserImg>
          <span>이름 : {user.username}</span>
          <span>{user.userNum}번째 회원입니다~</span>
          <span>내 프로필 이미지 설정</span>
          <input
            type="file"
            onChange={fileUpload}
            style={{ marginBottom: "20px" }}
          />
          <Button onClick={imgupload}>이미지 등록하기</Button>
        </UserImg>
        <UserInfo>
          <img
            src={`http://13.209.10.47:5000/${userimg}`}
            style={{ height: "100%" }}
          />
        </UserInfo>
      </Wrapper>
    </Container>
  );
};

export default UserProfile;
