import React, { Component } from "react";
import $ from "jquery";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: [],
      show: false,
      orderShow: false,
      genreShow: false,
      horror: "&with_genres=27",
      apiUrl:
        "https://api.themoviedb.org/3/discover/movie?api_key=0eef8ca95ff1ead2d5f19e8f272c6bee"
    };

    this.performSearch();
  }

  showModal = movie => {
    this.setState({ show: true });
    this.setState({ selectedMovie: movie });
    console.log(this.state.show);
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showGenreModal = () => {
    this.setState({ genreShow: true });
  };
  hideGenreModal = () => {
    this.setState({ genreShow: false });
  };

  showOrder = () => {
    this.setState({ orderShow: true });
  };
  hideOrder = () => {
    this.setState({ orderShow: false });
  };

  performSearch(genre) {
    console.log(genre);
    if (!genre) {
      genre = "";
    }
    const api = this.state.apiUrl + "&with_genres=" + genre;
    $.ajax({
      url: api,
      success: searchResults => {
        const results = searchResults.results;

        this.setState({ movies: results });
      },
      error: (xhr, status, err) => {
        console.log("Failed to fetch Movies");
      }
    });
    this.hideGenreModal();
    console.log(this.state.movies);
  }

  orderLTG = () => {
    let copy = this.state.movies;
    copy = copy.sort((a, b) => a.popularity > b.popularity);

    this.setState({ movies: copy });
    this.setState({ orderShow: false });
  };
  orderGTL = () => {
    let copy = this.state.movies;
    copy = copy.sort((a, b) => a.popularity < b.popularity);

    this.setState({ movies: copy });
    this.setState({ orderShow: false });
  };

  orderLTGS = () => {
    let copy = this.state.movies;
    copy = copy.sort((a, b) => a.vote_average > b.vote_average);

    this.setState({ movies: copy });
    this.setState({ orderShow: false });
  };

  orderGTLS = () => {
    let copy = this.state.movies;
    copy = copy.sort((a, b) => a.vote_average < b.vote_average);

    this.setState({ movies: copy });
    this.setState({ orderShow: false });
  };

  render() {
    const GenreModal = ({ handleClose, show, movie }) => {
      const showHideClassName = show
        ? "genreModal display-block"
        : "genreModal display-none";

      let style = {
        color: "gray",
        padding: "2px"
      };
      return (
        <div className={showHideClassName}>
          <section className="modal-main-genre">
            <div className="GENRES">
              <h3
                onClick={() => {
                  this.performSearch("");
                }}
                className="All"
              >
                All
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("28");
                }}
              >
                Action
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("12");
                }}
              >
                Adventure
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("35");
                }}
              >
                Comedy
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("99");
                }}
              >
                Documentary
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("18");
                }}
              >
                Drama
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("10751");
                }}
              >
                Family
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("14");
                }}
              >
                Fantasy
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("36");
                }}
              >
                History
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("27");
                }}
              >
                Horror
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("9648");
                }}
              >
                Mystery
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("10749");
                }}
              >
                Romance
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("878");
                }}
              >
                Science Fiction
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("53");
                }}
              >
                Thriller
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("10752");
                }}
              >
                War
              </h3>
              <h3
                onClick={() => {
                  this.performSearch("37");
                }}
              >
                Western
              </h3>
            </div>
          </section>
        </div>
      );
    };
    const Modal = ({ handleClose, show, movie }) => {
      const moviePoster =
        "https://image.tmdb.org/t/p/w185" +
        this.state.selectedMovie.poster_path;

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
              <h2 style={{ color: "white", marginLeft: "100px" }}>
                {this.state.selectedMovie.vote_average} ☆
              </h2>
            </div>
          </section>
        </div>
      );
    };
    const OrderBy = ({ handleClose, show, movie }) => {
      const showHideClassName = show
        ? "modalOrder display-block"
        : "modalOrder display-none";

      let style = {
        color: "gray",
        padding: "2px"
      };
      return (
        <div className={showHideClassName}>
          <section className="modal-main-orderby">
            <div className="orders">
              <h4
                onClick={() => {
                  this.orderGTL();
                }}
              >
                Popularity <span style={{ color: "#adff2f" }}>▲</span>
              </h4>
              <h4
                onClick={() => {
                  this.orderLTG();
                }}
              >
                Popularity <span style={{ color: "#adff2f" }}>▼</span>
              </h4>
              <h4
                onClick={() => {
                  this.orderGTLS();
                }}
              >
                Rating <span style={{ color: "#adff2f" }}>▲</span>
              </h4>
              <h4
                onClick={() => {
                  this.orderLTGS();
                }}
              >
                Rating <span style={{ color: "#adff2f" }}>▼</span>
              </h4>
            </div>
          </section>
        </div>
      );
    };
    return (
      <div className="App">
        <div
          className="appBody"
          onWheel={() => {
            this.hideGenreModal();
            this.hideOrder();
          }}
        >
          <nav className="nav">
            <h2>Movies R Us</h2>
          </nav>
          <GenreModal
            show={this.state.genreShow}
            handleClose={this.hideGenreModal}
          ></GenreModal>
          <Modal show={this.state.show} handleClose={this.hideModal}></Modal>
          <OrderBy
            show={this.state.orderShow}
            handleClose={this.hideOrder}
          ></OrderBy>

          <div className="Filter">
            <h3
              onClick={() => {
                // this.performSearch(this.state.horror);
                this.showGenreModal();
              }}
            >
              Genres{" "}
              <span style={{ fontSize: "14px", color: "#adff2f" }}>▼</span>
            </h3>
            <h3
              onClick={() => {
                // this.performSearch(this.state.horror);
                this.showOrder();
              }}
            >
              Order by{" "}
              <span style={{ fontSize: "14px", color: "#adff2f" }}>▼</span>
            </h3>
          </div>

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
        </div>
      </div>
    );
  }
}

export default App;
