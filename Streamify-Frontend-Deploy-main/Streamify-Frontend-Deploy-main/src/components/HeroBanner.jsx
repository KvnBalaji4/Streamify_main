// src/components/HeroBanner.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../assets/css/HeroBanner.css'; // Import the CSS for the HeroBanner

const HeroBanner = ({ bannerImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [bannerImages.length]);
  
  if (!bannerImages || bannerImages.length === 0 || !bannerImages[currentIndex]) {
    return null;
  }
  const { src, title, desc, driveFileId } = bannerImages[currentIndex];
  const prevIndex = (currentIndex - 1 + bannerImages.length) % bannerImages.length;
  const nextIndex = (currentIndex + 1) % bannerImages.length;

  return (
    <section className="carousel-banner">
      <img src={src} alt={title} className="carousel-image" />
      <img src={bannerImages[prevIndex].src} alt={bannerImages[prevIndex].title} className="shadow-image left-shadow" />
      <img src={bannerImages[nextIndex].src} alt={bannerImages[nextIndex].title} className="shadow-image right-shadow" />

      <div className="carousel-overlay">
        <h1>{title}</h1>
        <p>{desc}</p>
        <button onClick={() => navigate(`/watch/${driveFileId}`)}>Watch Now</button>
      </div>

      <button className="arrow left-arrow" onClick={() => setCurrentIndex(prevIndex)}>❮</button>
      <button className="arrow right-arrow" onClick={() => setCurrentIndex(nextIndex)}>❯</button>
    </section>
  );
};

export default HeroBanner;



