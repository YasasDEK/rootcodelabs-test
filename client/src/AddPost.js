import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./AddPost.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

export const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitPost = () => {
    if (title === "" || description === "") {
      alert("Empty Inputs");
    } else {
      Axios.post("http://localhost:3001/api/insert", {
        title: title,
        description: description,
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
          <h1>Create Post</h1>
        </div>

      <div className="form">
        <input
          className="title"
          placeholder="title"
          type="text"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          className="description"
          placeholder="description"
          type="text"
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button className="btn btn-dark" onClick={submitPost}>
          Publish
        </button>
      </div>
    </div>
  );
};
