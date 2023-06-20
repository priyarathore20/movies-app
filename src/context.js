import React, { useContext, useEffect, useState } from 'react';
// import useFetch from './useFetch';

const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext = React.createContext();

// we are getting the children and that is app component in our case
const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('hacker');
  const [isloading, setIsLoading] = useState(true);
  const [movie, setMovies] = useState([]);
  const [isError, setisError] = useState({ show: false, msg: '' });

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === 'True') {
        setIsLoading(false);
        setMovies(data.Search);
      } else {
        setisError({ show: true, msg: data.error });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 2000);
    return () => clearTimeout(timerOut);
  }, [query]);

  // const { isLoading, isError, Movie } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider value={{ movie, isloading, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext };
