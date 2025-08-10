import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isSmallScreen = window.innerWidth<=600;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  const handleRowClick = (e, id) => {
    if (e.target.closest("button")) return; // Skip if button was clicked
    navigate(`/message/${id}`);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error fetching messages"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr
                  key={c.id}
                  className={
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && "active"
                  }
                  onClick={(e) => handleRowClick(e, c.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{currentUser.isSeller ? 
                 isSmallScreen? `${c.buyerId.slice(0,6)}...` : c.buyerId :
                 isSmallScreen? `${c.sellerId.slice(0,6)}...`: c.sellerId
                 }</td>
                  <td>{c?.lastMessage?.substring(0, 100)}...</td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
