import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pagination.css";
export class Pagination extends Component {
  state = {
    numberOfPages: 10,
  };
  componentDidMount() {
    (async () => {
      await this.fetchCount();
    })();
  }
  fetchCount = async () => {
    const count = (await axios.get("/api/articles/count")).data;
    const numberOfPages = Math.ceil(count / this.props.limit);
    this.setState({
      numberOfPages,
    });
  };
  createPageTags = () => {
    const { numberOfPages } = this.state;
    const { page } = this.props;
    let leftIndex = page - 4;
    let rightIndex = page + 4;
    if (leftIndex < 1) {
      rightIndex += 1 - leftIndex;
      leftIndex = 1;
    }
    if (rightIndex > numberOfPages) {
      leftIndex -= rightIndex - numberOfPages;
      rightIndex = numberOfPages;
    }
    // sanity check
    leftIndex = Math.max(leftIndex, 1);
    rightIndex = Math.min(rightIndex, numberOfPages);
    const tags = [];
    for (let i = leftIndex; i <= rightIndex; i++) {
      tags.push(
        <li
          key={`page-${i}`}
          className={i === page ? "active" : "waves-effect"}
        >
          <Link
            to={{
              pathname: "/articles/all",
              search: `?page=${i}`,
            }}
            onClick={() => this.props.onClick(i, this.props.limit)}
            className="page-number"
          >
            {i}
          </Link>
        </li>
      );
    }
    const prevClass = page === 1 ? "disabled" : "waves-effect";
    const nextClass = page >= numberOfPages ? "disabled" : "waves-effect";
    const prevPage = Math.max(page - 1, 1);
    const nextPage = Math.min(page + 1, numberOfPages);
    return (
      <>
        <li className={prevClass}>
          <Link
            to={{
              pathname: "/articles/all",
              search: `?page=${1}`,
            }}
            onClick={() => this.props.onClick(1, this.props.limit)}
            className="page-icons"
          >
            <i className="material-icons">first_page</i>
          </Link>
        </li>
        <li className={prevClass}>
          <Link
            to={{
              pathname: "/articles/all",
              search: `?page=${prevPage}`,
            }}
            onClick={() => this.props.onClick(prevPage, this.props.limit)}
            className="page-icons"
          >
            <i className="material-icons">chevron_left</i>
          </Link>
        </li>
        {tags}
        <li className={nextClass}>
          <Link
            to={{
              pathname: "/articles/all",
              search: `?page=${nextPage}`,
            }}
            onClick={() => this.props.onClick(nextPage, this.props.limit)}
            className="page-icons"
          >
            <i className="material-icons">chevron_right</i>
          </Link>
        </li>
        <li className={nextClass}>
          <Link
            to={{
              pathname: "/articles/all",
              search: `?page=${numberOfPages}`,
            }}
            onClick={() => this.props.onClick(numberOfPages, this.props.limit)}
            className="page-icons"
          >
            <i className="material-icons">last_page</i>
          </Link>
        </li>
      </>
    );
  };

  render() {
    return (
      <>
        <div className="center-align">
          <ul className="pagination">{this.createPageTags()}</ul>
        </div>
      </>
    );
  }
}

export default Pagination;
