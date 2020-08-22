import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }
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
        style={{ width: 300 }}
        key={article._id}
        className="carousel-item"
        href="#"
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
        <div className="carousel no-autoinit">{articles}</div>
        <div className="row">
          <div className="col s6 center">
            <a href="/articles/date" className="btn center yellow darken-2">
              Read today's headlines
            </a>
          </div>

          <div className="col s6 center">
            <a href="/about" className="btn center yellow darken-2">
              About this project
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
