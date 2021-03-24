import React from 'react';
import {Switch, Route} from "react-router-dom";

// Components
import Header from "./components/Header"

// Views
import Home from "./views/Home";
import FilterMovies from "./views/FilterMovies";
import MovieInfo from "./views/MovieInfo";

const App = () => {
  return (
    <>
    <Header/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/movie-search=:movie" component={FilterMovies}/>
      <Route exact path="/movie/:id" component={MovieInfo}/>
    </Switch>
    </>
  );
}

export default App;
