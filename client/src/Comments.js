import React, { useState, useEffect } from "react";
import "./Comments.css";
import Axios from "axios";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

export const Comments = (props) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [posts, setPost] = useState([]);
  const commentId = JSON.stringify(
    props.history.location.pathname.split("/comments/")[1]
  );
  const x = parseInt(commentId.replace(/^"(.*)"$/, "$1"));

  // setId(props.match.params.id);
  console.log("idx  " + x);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getpost/" + x).then((responses) => {
      setPost(responses.data);
      console.log(responses.data);
    });

    Axios.get("http://localhost:3001/api/comments/" + x).then((response) => {
      setCommentList(response.data);
      console.log(response.data);
    });
  }, []);

  const submitComment = () => {
    if (comment === "") {
      alert("empty input");
    } else {
      Axios.post("http://localhost:3001/api/insertcomment", {
        id: x,
        comment: comment,
      });
      setCommentList([...commentList, { comment: comment }]);
    }
  };

  return (
    <div className="Home">
      <div class="col">
        <Link to="/home">
          <ArrowLeft />
        </Link>
      </div>
      <div class="col">
        <h1>COMMENTS</h1>
      </div>
      <div className="form">
        {posts.map((val) => {
          console.log("post " + val.title);
          return (
            <div className="card">
              <h2>Post: {val.title}</h2>
              <p>Description: {val.description}</p>
            </div>
          );
        })}

        {commentList.map((val) => {
          return (
            <div className="card2">
              <p>{val.comment}</p>
            </div>
          );
        })}

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
