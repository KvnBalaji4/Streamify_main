import React, { useRef } from "react";
import "./../assets/css/MovieSection.css";

const MovieSection = ({ title, movies }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const addToWatchlist = (videoId) => {
    const username = localStorage.getItem("username"); // ✅ now using username
    fetch(
      `http://localhost:6086/api/watchlist/add?username=${username}&videoId=${videoId}`,
      { method: "POST" }
    )
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => console.error(err));
  };

  return (
    <div className="movie-section">
      <h2 className="section-title">{title}</h2>
      <div className="carousel-container">
        <button className="scroll-btn left" onClick={() => scroll("left")}>
          &#10094;
        </button>
        <div className="movie-row" ref={rowRef}>
          {movies.map((movie, index) => (
            <div className="movie-card" key={index}>
              <img
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="movie-img"
              />
              <div className="movie-info">
                <h5 className="movie-title">{movie.title}</h5>
                <div className="actions">
                  <a href={`/watch/${movie.driveFileId}`} className="watch-btn">
                    Watch Now
                  </a>
                  <button
                    className="add-btn"
                    onClick={() => addToWatchlist(movie.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scroll("right")}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default MovieSection;
