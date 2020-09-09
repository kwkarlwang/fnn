import React, { Component } from "react";
import axios from "axios";
import M from "materialize-css";
import "./AllArticles.css";
import cnn_logo from "../assets/cnn.png";
import fox_logo from "../assets/fox_news.png";
import Pagination from "./Pagination";
import queryString from "query-string";

export class AllArticles extends Component {
  state = {
    error: false,
    articles: [],
    dates: {},
    collapsibles: [],
    limit: 30,
    isExpand: false,
  };
  getCurrentPage = () => {
    const query = queryString.parse(this.props.location.search);
    const page = parseInt(query.page) || 1;
    return page;
  };

  fetchData = async (page, limit) => {
    try {
      const dates = {};
      const params = {
        page,
        limit,
      };
      const res = await axios.get("/api/articles/page", { params });
      for (const article of res.data) {
        article.publishedAt = new Date(article.publishedAt);
        article.visible = true;
        let key = article.publishedAt.toLocaleDateString();
        if (key in dates) {
          dates[key].push(article);
        } else {
          dates[key] = [article];
        }
      }
      this.setState({
        dates,
      });
    } catch {
      this.setState({
        error: true,
      });
    }
    // try {
    //   const dates = {};
    //   const res = await axios.get("/api/articles");
    // for (const article of res.data) {
    //   article.publishedAt = new Date(article.publishedAt);
    //   article.visible = true;
    //   let key = article.publishedAt.toLocaleDateString();
    //   if (key in dates) {
    //     dates[key].push(article);
    //   } else {
    //     dates[key] = [article];
    //   }
    // }
    //   this.setState({
    //     ...this.state,
    //     dates,
    //     datesCopy: dates,
    //   });
    //   return true;
    // } catch {
    //   this.setState({
    //     ...this.state,
    //     error: true,
    //   });
    //   return false;
    // }
  };
  componentDidMount = () => {
    document.addEventListener("DOMContentLoaded", async () => {
      let elems = document.querySelectorAll(".pushpin");
      M.Pushpin.init(elems, {
        top: 80,
      });
      await this.fetchData(this.getCurrentPage(), this.state.limit);
      M.AutoInit();
      elems = document.querySelectorAll(".collapsible");
      this.state.collapsibles = M.Collapsible.init(elems, {
        accordion: false,
      });
    });
  };
  expandAll = () => {
    for (const collapsible of this.state.collapsibles) {
      const size = collapsible.$headers.length;
      for (let i = 0; i < size; i++) {
        if (!this.state.isExpand) collapsible.open(i);
        else collapsible.close(i);
      }
    }
    this.setState({
      isExpand: !this.state.isExpand,
    });
  };
  showPartialArticles = (source) => {
    const dates = this.state.dates;
    for (const key in dates) {
      dates[key].forEach((article) => {
        article.visible =
          article.source === source || source === "all" ? true : false;
      });
    }
    this.setState({
      dates,
    });
  };
  createCards = (articles, key) => {
    return (
      <ul key={key} className="collapsible no-autoinit">
        {articles.map((article) => {
          if (!article.visible) return;
          const logo = article.source === "CNN" ? cnn_logo : fox_logo;
          const options = {
            hour: "numeric",
            minute: "numeric",
          };
          return (
            <li key={article._id}>
              <div className="collapsible-header">
                <div className="logo-image valign-wrapper">
                  <img
                    src={logo}
                    alt="logo"
                    className="responsive-img circle"
                  />
                </div>
                <span className="valign-wrapper">{article.title}</span>
                <span
                  style={{ fontStyle: "italic" }}
                  className="badge valign-wrapper"
                >
                  {article.publishedAt.toLocaleString([], options)}
                </span>
              </div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="col s12 m9">
                    <a
                      style={{ color: "black" }}
                      className="tooltipped"
                      data-position="bottom"
                      data-tooltip="Click to read more"
                      href={article.url}
                    >
                      {article.description}
                    </a>
                  </div>
                  <div className="col s12 m3">
                    <img
                      className="responsive-img materialboxed"
                      src={article.image}
                      alt="article"
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
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

    const datesWithArticles = [];

    for (let key in this.state.dates) {
      datesWithArticles.push(<h5 key={`date-${key}`}>{key}</h5>);
      const articles = this.state.dates[key];
      datesWithArticles.push(this.createCards(articles, key));
    }
    return (
      <>
        <div className="row">
          <div className="col m12 l2 hide-on-med-and-down">
            <div className="pushpin no-autoinit">
              <blockquote>
                <a
                  className="waves-red waves-effect btn-flat"
                  onClick={this.expandAll}
                >
                  Toggle Expansion
                </a>
              </blockquote>

              <blockquote>
                <a
                  className="waves-red waves-effect btn-flat"
                  onClick={() => this.showPartialArticles("Fox News")}
                >
                  Show fox news only
                </a>
              </blockquote>
              <blockquote>
                <a
                  className="waves-red waves-effect btn-flat"
                  onClick={() => this.showPartialArticles("CNN")}
                >
                  Show CNN only
                </a>
              </blockquote>
              <blockquote>
                <a
                  className="waves-red waves-effect btn-flat"
                  onClick={() => this.showPartialArticles("all")}
                >
                  Show All News
                </a>
              </blockquote>
            </div>
          </div>
          <div className="col m12 l8">
            {datesWithArticles}
            <Pagination
              page={this.getCurrentPage()}
              limit={this.state.limit}
              onClick={this.fetchData}
            />
          </div>
        </div>
      </>
    );
  }
}

export default AllArticles;
