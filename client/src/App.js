import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Route exact path="/" component={Home} />
      <Route exact path="/articles" component={Articles} />
    </Router>
  );
}

export default App;
