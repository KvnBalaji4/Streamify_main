import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieSection from './MovieSection';

const GenreSection = ({ genre }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
   axios.get(`http://localhost:6086/api/genre/${genre}`, {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  }
});






  }, [genre]);

  return (
    <div>
      <MovieSection title={genre} movies={videos} />
    </div>
  );
};

export default GenreSection;
