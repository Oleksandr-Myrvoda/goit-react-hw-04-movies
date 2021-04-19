import React, { Component } from "react";
import PropTypes from "prop-types";
// import styles from "../../pages/PagesStyles.module.css";
import styles from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };

  handleCange = (event) => {
    this.setState({ searchQuery: event.currentTarget.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchQuery } = this.state;

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: "" });
  };

  render() {
    return (
      <>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button className={styles.button} type="submit">
            <span>Search</span>
          </button>
          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={this.searchQuery}
            onChange={this.handleCange}
          />
        </form>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
