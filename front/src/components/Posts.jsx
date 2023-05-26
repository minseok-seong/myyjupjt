import React from "react";
import styled from "styled-components";
import { posts } from "../data";
import Post from "./Post";

const Container = styled.div`
  max-width: 756px;
  margin: 0 auto;
`;
const Posts = ({ postList }) => {
  return (
    <Container>
      {postList.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Container>
  );
};

export default Posts;
