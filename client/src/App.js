import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import Home from "./components/Home";
import DateArticles from "./components/DateArticles";
import AllArticles from "./components/AllArticles";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/articles/date" component={DateArticles} />
      <Route exact path="/articles/all" component={AllArticles} />
    </Router>
  );
}

export default App;
