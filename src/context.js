import React, { useContext, useEffect, useState } from 'react';
import useFetch from './useFetch';

const API_URL = 'http://www.omdbapi.com/?apikey=a77ea526&';
const AppContext = React.createContext();

// we are getting the children and that is app component in our case
const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('hacker');
  const [isloading, setIsLoading] = useState(true);
  const [Movies, setMovies] = useState([]);
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
        setisError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies(API_URL);
  }, []);

  // const { isLoading, isError, Movie } = useFetch(`&s=${query}`);

  return (
    <AppContext.Provider
      value={{ query, Movies, setQuery, isloading, isError }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext };