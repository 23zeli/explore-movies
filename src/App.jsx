import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import MovieDetails from "./Components/MovieDetails";
import Header from "./Components/Header";
import React from "react";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;