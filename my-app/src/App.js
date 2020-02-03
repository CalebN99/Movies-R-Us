import React, { Component } from "react";
import $ from "jquery";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: [],
      show: false
    };

    this.performSearch();
  }

  showModal = movie => {
    this.setState({ show: true });
    this.setState({ selectedMovie: movie });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  performSearch() {
    console.log("Searched for movie");
    const api =
      "https://api.themoviedb.org/3/discover/movie?api_key=0eef8ca95ff1ead2d5f19e8f272c6bee&with_genres=27";
    $.ajax({
      url: api,
      success: searchResults => {
        console.log("Fetched Movies Successfully");

        const results = searchResults.results;
        console.log(results);
        this.setState({ movies: results });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch Movies");
      }
    });
  }
  render() {
    const Modal = ({ handleClose, show, movie }) => {
      const moviePoster =
        "https://image.tmdb.org/t/p/w185" +
        this.state.selectedMovie.poster_path;

      console.log(this.state.selectedMovie.title);
      const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

      let style = {
        color: "gray",
        padding: "2px"
      };
      return (
        <div className={showHideClassName}>
          <div onClick={handleClose} className="closeButton">
            <div>
              <h4>X</h4>
            </div>
          </div>
          <section className="modal-main">
            <div className="modalll">
              {" "}
              <div className="movieModal">
                <img src={moviePoster} />
                <p>{this.state.selectedMovie.overview}</p>
              </div>
            </div>
          </section>
        </div>
      );
    };
    return (
      <div className="App">
        <div className="appBody">
          <nav className="nav">
            <h2>Spook Films</h2>
          </nav>
          <Modal show={this.state.show} handleClose={this.hideModal}></Modal>
          <div className="Filter"></div>

          <div className="movieList">
            {this.state.movies.map(movie => {
              const moviePoster =
                "https://image.tmdb.org/t/p/w185" + movie.poster_path;
              return (
                <div
                  className="movieCard"
                  key={movie.id}
                  onClick={() => {
                    this.showModal(movie);
                  }}
                >
                  <img src={moviePoster} />
                  <p>{movie.title}</p>
                </div>
              );
            })}
          </div>
          <Modal
            show={this.state.showModal}
            handleClose={this.hideModal}
            movie={this.state.selectedMovie}
          ></Modal>
        </div>
      </div>
    );
  }
}

export default App;
