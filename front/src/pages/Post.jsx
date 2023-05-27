import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostDetail from "../components/PostDetail";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";

const InputDiv = styled.div`
  max-width: 756px;
  margin: 0 auto;
  height: 50px;
  border: 1px solid gainsboro;
  display: flex;
  margin-top: 10px;
`;
const Input = styled.input`
  flex: 7;
  border: none;
  outline: none;
  font-size: 15px;
`;
const Button = styled.button`
  flex: 3;
`;

const ButtonDiv = styled.div`
  max-width: 756px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;
const Edit = styled.button`
  width: 70px;
  height: 50px;
  margin-right: 10px;
  background-color: aliceblue;
`;
const Delete = styled.button`
  width: 70px;
  background-color: red;
`;
const Post = () => {
  const [post, setpost] = useState({});
  const [reple, setreple] = useState("");
  const postNumber = useParams(); // {id : 1}  여기서 id는 :id이고 1은 내가 설정한 pNum이다
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.post(
          "http://13.209.10.47:5000/api/post/detail",
          postNumber
        );

        if (res.data.success) {
          setpost(res.data.post);
        }
      } catch (e) {}
    };
    getPost();
  }, []);

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const res = await axios.post(
          "http://13.209.10.47:5000/api/post/delete",
          postNumber
        );

        if (res.data.success) {
          alert("삭제가 완료되었습니다");
          navigate("/");
        }
      } catch (e) {}
    }
  };

  const repleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      reple: reple,
      postId: post._id,
      uId: user.uId,
    };
    try {
      const res = await axios.post(
        "http://13.209.10.47:5000/api/reple/submit",
        body
      );
      setreple("");
      if (res.data.success) {
        alert("댓글작성성공");
      } else {
        alert("댓글작성실패");
      }
    } catch (e) {}
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <PostDetail post={post} />

      <ButtonDiv>
        <Link to={`/edit/${post.pNum}`}>
          <Edit>수정</Edit>
        </Link>
        <Delete onClick={handleDelete}>삭제</Delete>
      </ButtonDiv>
      <InputDiv>
        <Input
          placeholder="댓글을 입력하세요"
          value={reple}
          onChange={(e) => setreple(e.target.value)}
        />
        <Button onClick={repleSubmit}>등록</Button>
      </InputDiv>
      <Comments post={post} />
    </>
  );
};

export default Post;
