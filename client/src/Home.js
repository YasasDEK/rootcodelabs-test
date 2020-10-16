import React, { useState, useEffect } from "react";
import "./Home.css";
import Axios from "axios";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

export const Home = () => {
  const [id, setId] = useState(""); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setPostList(response.data);
    });
  }, []);

//   const submitPost = () => {
//     Axios.post("http://localhost:3001/api/insert", {
//       id: id,
//       title: title,
//       description: description,
//     });
//     if (title === "" || description === "") {
//       alert("empty input");
//     } else {
//       setPostList([...postList, { title: title, description: description }]);
//     }
//   };

  return (
    <div className="Home">
      <h1>Home</h1>

      <div className="form">
        <div className="newpost">
          <Link className="btn btn-dark" to="/addpost">
            CREATE A NEW POST
          </Link>
        </div>
        {postList.map((val) => {
          return (
            <div className="card">
              <h2>Post: {val.title}</h2>
              <p>Description: {val.description}</p>
              <Link to={`/comments/${val.id}`}>
              COMMENTS
            </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
