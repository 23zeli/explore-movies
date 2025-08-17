import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(id, apiKey);
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };
    getDetails();
  }, [id]);

  if (!movie) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "1rem" }}>
      <Link to="/">← Back</Link>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
      />
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
    </div>
  );
}

export default MovieDetails;
