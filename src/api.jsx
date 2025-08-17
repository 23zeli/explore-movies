// src/api.js

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesBySearch = async (searchTerm, page, apiKey) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&include_adult=false&language=en-US&page=${page}`
  );
  const data = await res.json();
  return data;
};

export const fetchPopularMovies = async (page, apiKey) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}&page=${page}`);
  const data = await res.json();
  return data;
};

export const fetchMovieDetails = async (movieId, apiKey) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${apiKey}`);
  const data = await res.json();
  return data;
};
