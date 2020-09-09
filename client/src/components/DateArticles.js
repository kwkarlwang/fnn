import React, { Component } from "react";
import M from "materialize-css";
import "./DateArticles.css";
import axios from "axios";

export class DateArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateInstance: {
        date: new Date(),
      },
      error: false,
      articles: [],
    };
  }
  handleDateChange = () => {
    try {
      const { date } = this.state.dateInstance || new Date();
      console.log(date);
      const params = { date };
      axios.get("/api/articles/date/", { params }).then((res) => {
        const articles = res.data;
        this.setState({
          articles,
        });
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };
  findMinDate = async () => {
    const res = await axios.get("/api/articles/date/min");
    const { minDate } = res.data;
    return new Date(minDate);
  };
  componentDidMount() {
    try {
      document.addEventListener("DOMContentLoaded", async () => {
        this.handleDateChange();
        const minDate = await this.findMinDate();
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
                {new Date(article.publishedAt).toLocaleString()}
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
    let articles_CNN = this.state.articles.filter(
      (article) => article.source === "CNN"
    );
    articles_CNN = articles_CNN.map((article) => this.createCard(article));
    let articles_Fox = this.state.articles.filter(
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

export default DateArticles;
