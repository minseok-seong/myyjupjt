import React from "react";
import { Link, location, useLocation } from "react-router-dom";
import "./SellMessages.scss";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

const SellMessages = () => {
  const location = useLocation();
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };
  const id = location.pathname.split("/")[2];

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/conversations/sell/${id}`)
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <>
      <Navbar />
      <div className="messages">
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="container">
            <div className="title">
              <span>메시지목록</span>
            </div>
            <table>
              <tr>
                <th>사람</th>
                <th>메시지</th>
                <th>시간</th>
                <th>전송</th>
              </tr>
              {data.map((c) => (
                <tr className="active" key={c.id}>
                  <td>{c.buyerId}</td>
                  <td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...{" "}
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    <button>하하</button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default SellMessages;
