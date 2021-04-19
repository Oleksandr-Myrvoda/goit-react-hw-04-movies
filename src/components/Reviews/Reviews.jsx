import React, { Component } from "react";

import * as apiService from "../../service/apiService";

class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    const { location, match } = this.props;
    const splitUrl = match.url.split("/");
    const id = splitUrl[splitUrl.length - 2];
    apiService
      .Reviews(location.state?.id || id)
      .then((results) => this.setState({ reviews: results }))
      .catch((error) => console.log(error));
  }

  render() {
    const { reviews } = this.state;
    const isShowReviews = reviews.length > 0;
    return (
      <>
        {isShowReviews ? (
          <ul>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <h4> Author: {author}</h4>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h3>We don't have any reviews for this movie</h3>
        )}
      </>
    );
  }
}

export default Reviews;
