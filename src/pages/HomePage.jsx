import React, { Component } from "react";
import * as apiService from "../service/apiService";

import MoviesList from "../components/MoviesList";

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    try {
      const response = await apiService.getTrendingMovies();
      this.setState({ movies: response });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <>
        <h1>Trending this week</h1>
        <MoviesList movies={movies} />
      </>
    );
  }
}

export default HomePage;
