import React from "react";
import { Home } from "./Home";
import { Comments } from "./Comments";
import { AddPost } from "./AddPost";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/addpost" component={AddPost} />
          <Route path="/comments" component={Comments} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
