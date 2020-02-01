import React, { Component } from "react";
import $ from "jquery";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };

    this.performSearch();
  }

  // componentDidMount() {
  //   fetch(
  //     "https://api.themoviedb.org/3/movie/550?api_key=0eef8ca95ff1ead2d5f19e8f272c6bee"
  //   )
  //     .then(res => res.json())
  //     .then(json => {
  //       this.setState({ movies: json.results });
  //     });
  //   console.log(this.state.movies);
  // }

  performSearch() {
    console.log("Searched for movie");
    const api =
      "https://api.themoviedb.org/3/discover/movie?api_key=0eef8ca95ff1ead2d5f19e8f272c6bee&with_genres=27";
    $.ajax({
      url: api,
      success: searchResults => {
        console.log("Fetched Movies Successfully");
        console.log(searchResults);
        const results = searchResults;
        console.log(results);
        this.setState({ movies: results });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch Movies");
      }
    });
  }
  render() {
    return (
      <div className="App">
        <div className="appBody">
          <nav className="nav">
            <h2>Spook Films</h2>
          </nav>
          <div className="Filter"></div>
          <div className="movieList">
            <div
              className="movieCard"
              onClick={() => {
                console.log(this.state.movies);
              }}
            >
              <div className="movieImage"></div>
              <p>
                Hush <span> Horror | Thriller </span>
              </p>
            </div>
            <div className="movieCard">
              <div className="movieImage"></div>
              <p>
                Hush <span> Horror | Thriller </span>
              </p>
            </div>
            <div className="movieCard">
              <div className="movieImage"></div>
              <p>
                Hush <span> Horror | Thriller </span>
              </p>
            </div>
            <div className="movieCard">
              <div className="movieImage"></div>
              <p>
                Hush <span> Horror | Thriller </span>
              </p>
            </div>
            <div className="movieCard">
              <div className="movieImage"></div>
              <p>
                Hush <span> Horror | Thriller </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
