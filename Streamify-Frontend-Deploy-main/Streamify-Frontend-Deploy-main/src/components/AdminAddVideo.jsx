import React, { useState } from 'react';
import './../assets/css/AdminAddVideo.css';
import AdminNavbar from '../components/AdminNavbar';

const AdminAddVideo = () => {
  const loggedInEmail = sessionStorage.getItem('email');

  const [video, setVideo] = useState({
    title: '',
    description: '',
    genres: [],  // Changed from a single genre to an array of genres
    year: '',
    duration: '',
    thumbnailUrl: '',
    driveFileId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genres") {
      // Update genres array (split by comma)
      const genresArray = value.split(",").map(genre => genre.trim());
      setVideo({ ...video, genres: genresArray });
    } else {
      setVideo({ ...video, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:6086/api/videos', {
      method: 'POST',
      credentials: 'include', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video)
    });

    if (response.ok) {
      alert('Video added successfully!');
      setVideo({
        title: '',
        description: '',
        genres: [], // Reset genres to an empty array
        year: '',
        duration: '',
        thumbnailUrl: '',
        driveFileId: ''
      });
    } else {
      alert('Failed to add video.');
    }
  };

  return (
    <>
      <AdminNavbar email={loggedInEmail} />
      <div className="admin-form">
        <h2>Add New Video</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={video.title} onChange={handleChange} placeholder="Title" required />
          <textarea name="description" value={video.description} onChange={handleChange} placeholder="Description" />
          
          {/* Genres input allows multiple genres, separated by commas */}
          <input 
            name="genres" 
            value={video.genres.join(', ')} 
            onChange={handleChange} 
            placeholder="Genres (e.g. Action, Comedy, Drama)" 
          />
          
          <input name="year" type="number" value={video.year} onChange={handleChange} placeholder="Year" />
          <input name="duration" value={video.duration} onChange={handleChange} placeholder="Duration (e.g. 2h 30m)" />
          <input name="thumbnailUrl" value={video.thumbnailUrl} onChange={handleChange} placeholder="Thumbnail URL" />
          <input name="driveFileId" value={video.driveFileId} onChange={handleChange} placeholder="Google Drive File ID" required />
          
          <button type="submit">Add Video</button>
        </form>
      </div>
    </>
  );
};

export default AdminAddVideo;
