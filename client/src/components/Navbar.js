import React, { Component } from "react";
import M from "materialize-css";
import "./Navbar.css";
import FNN_logo from "../assets/FNN.png";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      showSearch: false,
    };
    this.searchInput = React.createRef();
  }
  componentDidMount() {
    M.AutoInit();
  }
  componentDidUpdate() {
    this.searchInput.current.focus();
  }
  toggleSearch = (e) => {
    e.preventDefault();
    this.setState({ showSearch: !this.state.showSearch });
  };
  render() {
    let searchbarClass = "hidden";
    if (this.state.showSearch) {
      searchbarClass = "visible";
    }

    let SearchBar = (
      <nav
        id="searchbar"
        className={"container blue lighten-5 center " + searchbarClass}
      >
        <div className="nav-wrapper">
          <form>
            <div className="input-field">
              <input ref={this.searchInput} type="search" required />
              <label className="label-icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    );
    return (
      <div>
        <ul id="dropdown" className="dropdown-content">
          <li>
            <a href="/articles/date">View by date</a>
          </li>
          <li>
            <a href="/articles/all">View all articles</a>
          </li>
        </ul>
        <nav className="blue lighten-2">
          <div className="container nav-wrapper blue lighten-2">
            <a href="/" className="brand-logo">
              <img src={FNN_logo} alt="logo" className="logo" />
            </a>
            <a data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li className="valign-wrapper">
                <a className="dropdown-trigger" data-target="dropdown">
                  <span>
                    News
                    <i
                      style={{ marginLeft: "1px" }}
                      className="material-icons right"
                    >
                      arrow_drop_down
                    </i>
                  </span>
                </a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a onClick={this.toggleSearch}>Search</a>
              </li>
            </ul>
            {/* for mobile */}
            <ul id="nav-mobile" className="sidenav">
              <li>
                <a href="/articles/all">All News</a>
              </li>
              <li>
                <a href="/articles/date">News by date</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a className="sidenav-close" onClick={this.toggleSearch}>
                  Search
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {SearchBar}
      </div>
    );
  }
}

export default Navbar;
