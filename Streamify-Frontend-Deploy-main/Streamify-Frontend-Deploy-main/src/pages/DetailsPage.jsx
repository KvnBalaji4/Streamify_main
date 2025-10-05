import React from "react";
import Navbar from "../components/Navbar";
import MovieDetails from "../components/MovieDetails";
import MovieList from "../components/MovieList";

const DetailsPage = () => {
  return (
    <div className="DetailsPage">
      <Navbar />
      <div className="content">
        <MovieDetails />
        <MovieList />
      </div>
    </div>
  );
};

export default DetailsPage;
