import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { posts } from "../data";
import moment from "moment";
import "moment/locale/ko";

const Container = styled.div`
  max-width: 756px;
  margin: 0 auto;
  margin-top: 10px;
  border: 1px solid gainsboro;
  margin-bottom: 10px;
`;
const Wrapper = styled.div`
  padding: 20px 20px;
`;
const Title = styled.h1`
  margin-bottom: 10px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 5px;
`;
const Name = styled.div`
  margin-right: 5px;
`;
const Time = styled.div``;
const ImgDiv = styled.div`
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
`;
const Desc = styled.div`
  margin-top: 10px;
`;
const PostDetail = ({ post }) => {
  const user = useSelector((state) => state.user);
  console.log(post);
  return (
    <Container>
      <Wrapper>
        <Title>{post.title}</Title>
        <UserInfo>
          <div style={{ display: "flex", alignItems: "center" }}>
            {user.userimg ? (
              <Img src={`http://localhost:5000/${user.userimg}`} alt="" />
            ) : null}
            {post.author && <Name>{post.author.username}</Name>}
          </div>

          <Time>{moment(post.createAt).format("MMM Do YY")}</Time>
        </UserInfo>
        <ImgDiv>
          {post.image ? (
            <Image src={`http://localhost:5000/${post.image}`} alt="" />
          ) : null}
        </ImgDiv>
        <Desc>{post.content}</Desc>
      </Wrapper>
    </Container>
  );
};

export default PostDetail;
