import React, { Component } from "react";
import $ from "jquery";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: [],
      showModal: false
    };

    this.performSearch();
  }

  showModal = () => {
    this.setState({ showModal: true });
    console.log(this.state.showModal);
  };
  hideModal = () => {
    this.setState({ showModal: false });
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
    const Modal = ({ handleClose, show, children }) => {
      const showHideClassName = show
        ? "modal display-block"
        : "modal display-none";

      let style = {
        color: "gray",
        padding: "2px"
      };
      return (
        <div className={showHideClassName}>
          <section className="modal-main">
            <div onClick={handleClose} className="closeButton">
              <div>
                <i class="far fa-times-circle" style={style}></i>
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
          <div className="Filter"></div>
          <Modal
            show={this.state.showModal}
            handleClose={this.hideModal}
            movie={this.state.selectedMovie}
          ></Modal>
          <div className="movieList">
            {this.state.movies.map(movie => {
              const moviePoster =
                "https://image.tmdb.org/t/p/w185" + movie.poster_path;
              return (
                <div
                  className="movieCard"
                  key={movie.id}
                  onClick={this.showModal}
                >
                  <img src={moviePoster} />
                  <p>{movie.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
