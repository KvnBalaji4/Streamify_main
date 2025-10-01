// src/components/MovieSection.jsx
import React from 'react';
import './../assets/css/MovieSection.css';

const MovieSection = ({ title, movies }) => {
  return (
    <div className="movie-section">
      <h2>{title}</h2>
      <div className="row">
        {movies.map((movie, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <div className="card">
              <img src={movie.thumbnailUrl} alt={movie.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                {movie.desc && <p className="card-text">{movie.desc}</p>}
                <a href={`/watch/${movie.driveFileId}`} className="btn btn-primary">Watch Now</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSection;