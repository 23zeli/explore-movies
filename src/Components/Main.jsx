import React from "react";
import { fetchMoviesBySearch, fetchPopularMovies } from "../api";
import { Link } from "react-router-dom";

function Main() {
  const [movies, setMovies] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  // Debounce effect: triggers 1500ms after user stops typing
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch data when debouncedSearchTerm or page changes
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = debouncedSearchTerm
          ? await fetchMoviesBySearch(debouncedSearchTerm, page, apiKey)
          : await fetchPopularMovies(page, apiKey);

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearchTerm, page]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <span className="material-symbols-outlined icon">search</span>
          <input
            className="input"
            type="text"
            placeholder="Search movies..."
            onChange={handleChange}
            value={searchTerm}
          />
        </div>
      </form>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3 className="movie_title">{movie.title}</h3>
              <p>⭐ {movie.vote_average}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px",}}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ◀ Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default Main;
