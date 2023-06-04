import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid gainsboro;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 20px 10px;
`;

const UserDiv = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;
const Image = styled.img``;
const Name = styled.span`
  margin-left: 10px;
`;
const Time = styled.span``;
const Desc = styled.span``;
const Comment = ({ comment }) => {
  return (
    <Container>
      <UserDiv>
        <Avatar src="#" />
        <Name>{comment.author.username}</Name>
      </UserDiv>
      <Time>{comment.time}</Time>
      <Desc>{comment.reple}</Desc>
    </Container>
  );
};

export default Comment;
