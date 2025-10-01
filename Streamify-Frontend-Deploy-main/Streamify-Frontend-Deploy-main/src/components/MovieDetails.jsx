// src/components/MovieDetails.jsx
import React from "react";


const MovieDetails = () => {
  return (
    <div className="movie-details">
      <img src="/images/salaar.jpg" alt="Salaar" className="movie-image" />
      <div className="movie-info">
        <h1>SALAAR</h1>
        <p>2023 | 2h 30m | Action, Adventure</p>
        <p>
          Just when the prince of Khansaar is about to rise to the throne, a
          plan of overthrowing him is exercised and only one man can help him
          retrieve power.
        </p>
        <div className="buttons">
          <button className="play-btn">Play</button>
          <button className="list-btn">+ My List</button>
        </div>
        <p><strong>CAST:</strong> Prabhas, Shruti Haasan, Jagapathi Babu, Prithviraj Sukumaran</p>
        <p><strong>DIRECTOR:</strong> Prashanth Neel</p>
      </div>
    </div>
  );
};

export default MovieDetails;
