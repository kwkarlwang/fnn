import React, { Component } from "react";
import M from "materialize-css";
import "./Navbar.css";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      showSearch: false,
    };
  }
  componentDidMount() {
    M.AutoInit();
  }
  toggleSearch = (e) => {
    e.preventDefault();
    this.setState({ showSearch: !this.state.showSearch });
  };
  render() {
    let searchbarClass = "container hidden";
    if (this.state.showSearch) {
      searchbarClass = "container visible";
    }

    let SearchBar = (
      <div className={searchbarClass}>
        <form id="searchbar">
          <div className="input-field">
            <i className="material-icons prefix">search</i>
            <input
              type="text"
              placeholder="Search for topics from CNN and Fox news"
            />
          </div>
        </form>
      </div>
    );
    return (
      <div>
        <nav className="nav-extended blue">
          <div className="nav-wrapper container">
            <a className="brand-logo">Logo</a>
            <a data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/" onClick={this.toggleSearch}>
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
