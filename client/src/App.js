import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import Home from "./components/Home";
import DateArticles from "./components/DateArticles";
import AllArticles from "./components/AllArticles";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/articles/date" component={DateArticles} />
        <Route exact path="/articles/all" component={AllArticles} />
        <Route exact path="/:other" component={About}></Route>
      </Switch>
    </Router>
  );
}
export default App;

function NotFound() {
  return (
    <div className="container">
      <h1>This page has not been implemented yet : )</h1>
    </div>
  );
}
