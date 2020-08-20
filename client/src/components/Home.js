import React, { Component } from "react";
import M from "materialize-css";
import "./Home.css";
import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateInstance: {
        date: new Date(),
      },
      articles: [],
      error: false,
      dateArticles: [],
    };
  }
  handleDateChange = () => {
    const startDate = this.state.dateInstance.date;
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);
    const dateArticles = this.state.articles.filter(
      (article) =>
        startDate <= article.publishedAt && article.publishedAt < endDate
    );
    this.setState({
      ...this.state,
      dateArticles,
    });
  };
  findMinDate = () => {
    const { articles } = this.state;
    console.log(articles);
    let minDate = new Date();
    for (const article of articles) {
      const { publishedAt } = article;
      if (publishedAt < minDate) {
        minDate = publishedAt;
      }
    }
    return minDate;
  };
  fetchData = async () => {
    try {
      const res = await axios.get("/api/articles");
      for (const article of res.data) {
        article.publishedAt = new Date(article.publishedAt);
      }
      this.state.articles = res.data;
      return true;
    } catch {
      this.setState({
        ...this.state,
        error: true,
      });
      return false;
    }
  };
  componentDidMount() {
    try {
      document.addEventListener("DOMContentLoaded", async () => {
        await this.fetchData();
        const minDate = this.findMinDate();
        const maxDate = new Date();
        const elems = document.querySelector(".datepicker");
        const options = {
          autoClose: true,
          defaultDate: new Date(),
          setDefaultDate: true,
          onSelect: this.handleDateChange,
          minDate,
          maxDate,
        };
        this.state.dateInstance = M.Datepicker.init(elems, options);
        this.handleDateChange();
      });
    } catch (e) {
      this.setState({
        ...this.state,
        error: true,
      });
    }
  }
  createCard = (article) => {
    const titleColor = article.source === "Fox News" ? "blue-text" : "red-text";
    return (
      <div key={article._id} className="row">
        <div className="card">
          <a href={article.url} className="card-image">
            <img src={article.image} alt="article" />
          </a>
          <div className="card-content">
            <span className={"card-title " + titleColor}>{article.title}</span>
            <p>{article.description}</p>
            <br />
            <p>
              <span style={{ fontStyle: "italic" }} className="grey-text">
                {article.publishedAt.toLocaleString()}
              </span>
              <span className="badge">
                <a href={article.url} className="amber-text text-darken-2">
                  READ MORE
                </a>
              </span>
            </p>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    );
  };
  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <h1>An error occured :(, please refresh</h1>
        </div>
      );
    }
    let articles_CNN = this.state.dateArticles.filter(
      (article) => article.source === "CNN"
    );
    articles_CNN = articles_CNN.map((article) => this.createCard(article));
    let articles_Fox = this.state.dateArticles.filter(
      (article) => article.source === "Fox News"
    );
    articles_Fox = articles_Fox.map((article) => this.createCard(article));

    return (
      <div className="container">
        <div className="input-field">
          <i className="material-icons prefix">date_range</i>
          <input type="text" id="datepicker-input" className="datepicker" />
          <label htmlFor="datepicker-input">View News of a specific date</label>
        </div>
        <div className="row">
          <div id="fox-list" className="col s12 m6">
            <h5 className="center">
              Showing {articles_Fox.length} headlines from
              <span className="blue-text"> Fox News</span>
            </h5>
            {articles_Fox}
          </div>
          <div id="cnn-list" className="col s12 m6">
            <h5 className="center">
              Showing {articles_CNN.length} headlines from
              <span className="red-text"> CNN</span>
            </h5>
            {articles_CNN}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
