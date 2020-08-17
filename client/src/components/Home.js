import React, { Component } from "react";
import M from "materialize-css";
import axios from "axios";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateInstance: null,
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
    console.log(dateArticles);
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
    // M.AutoInit();
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
  }
  render() {
    return (
      <div className="container">
        <div className="input-field">
          <i className="material-icons prefix">date_range</i>
          <input type="text" id="datepicker-input" className="datepicker" />
          <label htmlFor="datepicker-input">
            View News from a specific date
          </label>
        </div>
      </div>
    );
  }
}

export default Home;
