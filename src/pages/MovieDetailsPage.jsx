import React, { Component, lazy } from "react";
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import * as apiService from "../service/apiService";
import routes from "../routes/mainRoutes";
import styles from "./PagesStyles.module.css";
const Cast = lazy(() => import("../components/Cast" /*webpackChunkName: "cast"*/));
const Reviews = lazy(() => import("../components/Reviews" /*webpackChunkName: "reviews"*/));

class MoviesDetailsPage extends Component {
  state = {
    title: null,
    release_date: null,
    vote_average: null,
    overview: null,
    genres: [],
    poster_path: null,
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await apiService.movieDetails(movieId);

    this.setState({ ...response });
  }

  handleGoBack = () => {
    const { history, location } = this.props;
    history.push(location?.state?.from || routes.home);
  };

  render() {
    const { genres, overview, poster_path, title, vote_average } = this.state;
    const { match, location } = this.props;

    return (
      <section>
        <button className={styles.button} type="button" onClick={this.handleGoBack}>
          Go back
        </button>

        <h1>{title}</h1>
        <div className={styles.movieCard}>
          <img src={`https://image.tmdb.org/t/p/w342/${poster_path}`} alt={title} />
          <div className={styles.cardText}>
            <h2>Rating: {vote_average * 10}%</h2>
            <p>{overview}</p>
            <ul>
              {genres.map(({ id, name }) => (
                <li className={styles.genresList} key={id}>
                  {name},
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className={styles.reviewList}>
          <li className={styles.navItem}>
            <NavLink
              to={{
                pathname: `${match.url}/cast`,
                state: { from: location.state?.from, id: match.params.movieId },
              }}
            >
              Cast
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to={{
                pathname: `${match.url}/reviews`,
                state: { from: location.state?.from, id: match.params.movieId },
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>

        <Switch>
          <Route exact path={`${match.url}/cast`} component={Cast} />
        </Switch>
        <Route exact path={`${match.url}/reviews`} component={Reviews} />
      </section>
    );
  }
}

export default MoviesDetailsPage;
