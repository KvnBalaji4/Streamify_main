import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './../assets/css/WatchPage.css';

const WatchPage = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();

  if (!fileId) return <div>No video selected.</div>;

  const videoSrc = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="WatchPage">
      <Navbar />
      <div className="player-container">
        <div className="movie-player-header">
          <button className="btn movie-player-back-button" onClick={() => navigate(-1)}>🔙 Back</button>
        </div>

        <div className="video-wrapper">
          <iframe
            src={videoSrc}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Movie Player"
            className="video-frame"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
