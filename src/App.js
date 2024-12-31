import './App.css';
import {useState, useEffect} from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


//514cc0bf


const API_URL = 'http://www.omdbapi.com?apikey=514cc0bf'


function App() {
  const [movies, setMovies] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');

  const handleSearch = (() => {
    searchMovies(searchTerm);
  });

  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  }

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search);
  
  };

  

  return (
    <div className="App">
      <h1>Movie Search</h1>

        <div className="search">
          <input
           type="text"
           placeholder="Search for a movie..." 
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.data)}
            onKeyDown={checkEnter}
           />
            <img
             src={SearchIcon}
             alt="Search Icon" 
             onClick={handleSearch}
           />
      </div>
     {
        movies?.length > 0 
          ? (
              <div className="container">
                {movies.map((movie) => <MovieCard movieOne={movie}/>)} 
              </div>
          ): (      
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )
        }
      
    </div>
  );
} 

export default App;
