import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
import FNN_logo from "../assets/FNN.png";
import "./Home.css";
export class Home extends Component {
  state = {
    articles: [],
  };
  componentDidMount = () => {
    try {
      document.addEventListener("DOMContentLoaded", async () => {
        const res = await axios.get("/api/articles/less");
        this.setState({
          articles: res.data,
        });
        const elems = document.querySelectorAll(".carousel");
        M.Carousel.init(elems, {});
      });
    } catch (err) {
      console.log(err);
    }
  };
  createCard = (article) => {
    const titleColor = article.source === "Fox News" ? "blue-text" : "red-text";
    return (
      <div
        key={article._id}
        style={{ width: "20rem" }}
        className="carousel-item"
      >
        <div className="card">
          <div className="card-image">
            <img className="" src={article.image} alt="article" />
          </div>
          <div style={{ padding: "0.75rem" }} className="card-content">
            <p className={titleColor}>{article.title}</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const articles = this.state.articles.map((article) => {
      return this.createCard(article);
    });

    return (
      <div className="container">
        <div className="row">
          <div className="center-align">
            <div style={{ height: "2.5rem" }}></div>
            <img className="home-logo" src={FNN_logo} alt="logo" />
            <div style={{ height: "2.5rem" }}></div>
            <h5 className="header light">
              An one place stop to compare headlines between{" "}
              <span className="blue-text">Fox News</span> and{" "}
              <span className="red-text">CNN</span>
            </h5>
          </div>
        </div>
        <div
          style={{ height: "23rem" }}
          className="carousel carousel no-autoinit"
        >
          {articles}
        </div>
        <div className="row">
          <div style={{ height: "3.5rem" }}></div>
          <div className="col s12 m2"></div>
          <div className="col s6 m4 center">
            <a
              href="/articles/date"
              style={{ height: "100%" }}
              className="btn center yellow darken-2"
            >
              Read today's News
            </a>
          </div>

          <div className="col s6 m4 center">
            <a
              href="/about"
              style={{ height: "100%" }}
              className="btn center yellow darken-2"
            >
              About this project
            </a>
          </div>
          <div style={{ height: "5rem" }}></div>
        </div>
      </div>
    );
  }
}

export default Home;
