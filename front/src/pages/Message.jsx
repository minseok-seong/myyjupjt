import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import Navbar from "../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const Message = () => {
  const [desc, setdesc] = useState("");
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  console.log(user);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axios.get(`http://localhost:5000/api/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (message) => {
      return axios.post(`http://localhost:5000/api/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: desc,
      userId: user.uId,
    });
    setdesc("");
    window.location.replace(`/message/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="message">
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">메시지</Link>
          </span>
          {isLoading ? (
            "loading"
          ) : error ? (
            "error"
          ) : (
            <div className="messages">
              {data.map((m) => (
                <div
                  className={m.userId === user.uId ? "owner item" : "item"}
                  key={m._id}
                >
                  <img
                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          )}
          <hr />
          <form className="write" onSubmit={handleSubmit}>
            <textarea
              type="text"
              placeholder="write a message"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
            <button type="submit">전송</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Message;
