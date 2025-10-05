import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import HeroBanner from '../components/HeroBanner';
import MovieSection from '../components/MovieSection';
import './../assets/css/AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const storedUsername =
      sessionStorage.getItem('username') || localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (storedUsername && role === '1') {
      setUsername(storedUsername);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  // fetch videos
  useEffect(() => {
    fetch('http://localhost:6086/api/videos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch videos');
        return res.json();
      })
      .then((data) => {
        setMovies(data);

        // collect unique genres
        const allGenres = [
          ...new Set(data.flatMap((movie) => movie.genres || [])),
        ];
        setGenres(allGenres);
      })
      .catch((err) => {
        console.error('Error fetching videos:', err);
      });
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Admin Navigation */}
      <AdminNavbar username={username} />

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        {/* Removed the Welcome text */}

        {/* Banner with movie thumbnails */}
        <HeroBanner
          bannerImages={movies.map((m) => ({
            src: m.thumbnailUrl,
            title: m.title,
            desc: m.description,
            driveFileId: m.driveFileId,
          }))}
        />

        {/* All Movies Section */}
        <MovieSection title="All Videos" movies={movies} />

        {/* Genre-based Sections */}
        {genres.map((genre) => (
          <MovieSection
            key={genre}
            title={genre}
            movies={movies.filter((movie) => movie.genres?.includes(genre))}
          />
        ))}
      </main>

      <Footer />
    </div>
  );
}
