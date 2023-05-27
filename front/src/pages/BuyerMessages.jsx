import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BuyerMessages.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Navbar from "../components/Navbar";

const BuyerMessages = () => {
  const location = useLocation();
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };
  const id = location.pathname.split("/")[2];

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversationss"],
    queryFn: () =>
      axios
        .get(`http://13.124.237.66:5000/api/conversations/buy/${id}`)
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
              <thead>
                <tr>
                  <th>사람</th>
                  <th>메시지</th>
                  <th>시간</th>
                  <th>전송</th>
                </tr>
              </thead>
              <tbody>
                {data.map((c) => (
                  <tr className="active" key={c.id}>
                    <td>{c.buyerId}</td>
                    <td>
                      <Link to={`/message/${c.id}`} className="link">
                        {c?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(c.updataAt).fromNow()}</td>
                    <td>
                      <button>하하</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default BuyerMessages;
