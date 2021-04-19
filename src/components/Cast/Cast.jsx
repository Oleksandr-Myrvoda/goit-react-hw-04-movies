import React, { Component } from "react";
import * as apiService from "../../service/apiService";

export default class Cast extends Component {
  state = {
    actorsList: [],
  };

  componentDidMount() {
    const { location, match } = this.props;
    const splitUrl = match.url.split("/");
    const id = splitUrl[splitUrl.length - 2];
    apiService
      .Cast(location.state?.id || id)
      .then((cast) => this.setState({ actorsList: cast }))
      .catch((error) => console.log(error));
  }

  render() {
    const { actorsList } = this.state;
    const isShowCast = actorsList.length > 0;

    return (
      <>
        {isShowCast && (
          <ul>
            {actorsList.map((actor) => (
              <li key={actor.id}>
                <img
                  src={`http://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={`Actor: ${actor.name}`}
                  width="200"
                />
                <h3>{actor.name}</h3>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}
