import React from "react";
// import { Link } from "react-router-dom";

function Header({ darkMode, setDarkMode }) {
  return (
    <header style={{ padding: "1rem", textAlign: "center" }}>
      {/* <Link to="/" style={{ textDecoration: "none", fontSize: "24px" }}>
        🎬 
        Explorer Movies
      </Link> */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          marginLeft: "20px",
          padding: "6px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}

export default Header;
