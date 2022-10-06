
import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

// 7beef146
const API_URL = 'http://www.omdbapi.com/?apikey=7beef146'

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");          // State for search
  const [movies, setMovies] = useState([]);                  // state for movies

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm} 
          // Search Function
          onChange={(e)  => {
            setSearchTerm(e.target.value)
            searchMovies(searchTerm)
          }}
          // onClick={() => searchMovies(searchTerm)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          // passing here search function term
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
       
       {/* Condition to find movies */}
      {movies?.length > 0 ? (                          
        <div className="container">
                                            {/* movie.map is use when have to map on aother component, mean to get data from another component   */}
          {movies.map((movie) => (
            <MovieCard movie={movie} />                     
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
