import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";

const comments = [
  {
    id: "민석",
    time: 2012,
    desc: "desc",
  },
  {
    id: "민석",
    time: 2012,
    desc: "desc",
  },
];
const Container = styled.div`
  max-width: 756px;
  margin: 0 auto;
  margin-top: 10px;
`;
const Comments = ({ post }) => {
  const [reples, setreples] = useState([]);

  useEffect(() => {
    const content = { id: post._id };
    const getReple = async () => {
      try {
        const res = await axios.post(
          "http://13.124.237.66:5000/api/reple/getReple",
          content
        );

        if (res.data.success) {
          setreples([...res.data.reple]);
        }
      } catch (e) {}
    };
    getReple();
  }, [reples]);

  return (
    <Container>
      {reples.map((reples) => (
        <Comment comment={reples} />
      ))}
    </Container>
  );
};

export default Comments;
