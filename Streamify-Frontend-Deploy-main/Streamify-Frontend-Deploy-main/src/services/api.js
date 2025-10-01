// src/services/api.js

const API_BASE_URL = 'http://localhost:6086/api/videos'; // Adjust the base URL as needed

// Function to fetch all videos
export const fetchVideos = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to fetch a single video by ID
export const fetchVideoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch video with ID ${id}:`, error);
    throw error; // Rethrow the error for further handling
  }
};

// Function to add a new video
export const addVideo = async (video) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to add video:", error);
    throw error; // Rethrow the error for further handling
  }
};

// You can add more functions for PUT, DELETE, etc.

