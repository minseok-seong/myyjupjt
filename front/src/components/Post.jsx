import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  border: 1px solid gainsboro;
  margin-bottom: 10px;
`;

const LinkStyle = styled(Link)`
  color: black;
  text-decoration: none;
`;
const Title = styled.span`
  font-weight: 600;
  margin-bottom: 10px;
  color: black;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const User = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Name = styled.div``;
const Time = styled.div``;
const Desc = styled.div``;
const Post = ({ post }) => {
  const user = useSelector((state) => state.user);
  console.log(post.createdAt);
  return (
    <Container>
      <LinkStyle to={`/post/${post.pNum}`}>
        <Title>{post.title}</Title>
      </LinkStyle>
      <UserInfo>
        <User>
          {user.userimg ? (
            <Img src={`http://13.209.10.47:5000/${user.userimg}`} alt="" />
          ) : null}

          <Name>{post.author.username}</Name>
        </User>
        <Time>{moment(post.createdAt).format("MMM Do")}</Time>
      </UserInfo>
      <Desc>{post.content}</Desc>
    </Container>
  );
};

export default Post;
