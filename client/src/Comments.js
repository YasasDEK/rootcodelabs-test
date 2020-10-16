import React, { useState, useEffect } from "react";
import "./Comments.css";
import Axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

export const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");
  const [commentList, setCommentList] = useState([]);
  // setId(props.match.params.id);
  var commentId = props.match.params.id;
  console.log("id " + commentId);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/comments/${commentId}`).then(
      (response) => {
        setCommentList(response.data);
      }
    );
  }, []);

  const submitComment = () => {
    if (comment === "") {
      alert("empty input");
    } else {
      Axios.post("http://localhost:3001/api/insertcomment", {
        id: commentId,
        comment: comment,
      });
    }
  };

  return (
    <div className="AddPost">
      <div class="col">
        <Link to="/home">
          <ArrowLeft />
        </Link>
      </div>
      <div class="col">
        <h1>COMMENTS</h1>
      </div>

      <div className="form">
        <input
          className="comment"
          placeholder="comment"
          type="text"
          name="comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />

        <button className="btn btn-dark" onClick={submitComment}>
          Comment
        </button>
      </div>
    </div>
  );
};
