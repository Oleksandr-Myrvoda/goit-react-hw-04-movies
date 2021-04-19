import React, { Component } from "react";
import * as apiService from "../service/apiService";

import Searchbar from "../components/Searchbar";
import MoviesList from "../components/MoviesList";
import queryString from "query-string";

class MoviesPage extends Component {
  state = {
    movies: [],
    searchQuery: "",
    error: null,
  };

  componentDidMount() {
    const { location } = this.props;
    const { searchQuery } = queryString.parse(location.search);
    searchQuery &&
      apiService.movieDetails(searchQuery).then((results) => {
        this.setState({ movies: results });
      });
  }

  handleSearch = (searchQuery) => {
    const { history } = this.props;
    this.setState({
      searchQuery: searchQuery,
    });
    apiService
      .search(searchQuery)
      .then((results) => {
        this.setState({ movies: results });
      })
      .catch((error) => console.log(error));

    history.push({
      pathname: history.location.pathname,
      search: `searchQuery=${searchQuery}`,
    });
  };

  render() {
    const { movies } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        {movies.length > 0 && <MoviesList movies={movies} />}
      </>
    );
  }
}

export default MoviesPage;
