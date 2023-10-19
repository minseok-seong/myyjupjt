import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import Navbar from "../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const Message = () => {
  const [desc, setdesc] = useState("");
  const [ui, setui] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  console.log(user);

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      axios.get(`http://13.124.27.126:5000/api/messages/${id}`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (message) => {
      return axios.post(`http://13.124.27.126:5000/api/messages`, message);
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
    setui(!ui);
    // window.location.replace(`/message/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="background">
        <div className="message">
          <div className="container">
            {/* <span className="breadcrumbs">
              <Link to="/messages">메시지</Link>
            </span> */}
            {ui === false ? (
              <>
                {isLoading ? (
                  "loading"
                ) : error ? (
                  "error"
                ) : (
                  <div className="messages">
                    {data.map((m) => (
                      <div
                        className={
                          m.userId === user.uId ? "owner item" : "item"
                        }
                        key={m._id}
                      >
                        {/* <img
                          src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        /> */}
                        <Avatar />
                        <p>{m.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                <hr />
                <form className="write" onSubmit={handleSubmit}>
                  <textarea
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                  />
                  <button type="submit">전송</button>
                </form>
              </>
            ) : (
              <>
                {isLoading ? (
                  "loading"
                ) : error ? (
                  "error"
                ) : (
                  <div className="messages">
                    {data.map((m) => (
                      <div
                        className={
                          m.userId === user.uId ? "owner item" : "item"
                        }
                        key={m._id}
                      >
                        {/* <img
                          src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                          alt=""
                        /> */}
                        <Avatar />
                        <p>{m.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                <hr />
                <form className="write" onSubmit={handleSubmit}>
                  <textarea
                    type="text"
                    placeholder="메시지를 입력하세요"
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                  />
                  <button type="submit">전송</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
