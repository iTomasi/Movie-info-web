import React, {useState, useEffect} from "react";
import CardMovie from "../components/CardMovie";
import {useParams} from "react-router-dom";
import "./css/filterMovies.css";

const FilterMovies = () => {
    const {movie}: any = useParams();

    const [moviesList, setMoviesList] = useState({
        response: false,
        totalFound: 0,
        datas: []
    })

    useEffect(() => {
        fetch("http://www.omdbapi.com/?&apikey=675192f0&s=" + movie)
            .then(res => res.json())
            .then(res => {
                if (res.Response !== "True") return console.log(res)

                setMoviesList((prevMovie: any) => (
                    {...prevMovie, response: true, totalFound: res.Search.length, datas: res.Search}
                ))
            })
    }, [])

    return (
        <>
        <h2 className="moviesFound">Movies Found: {moviesList.totalFound}</h2>
        <div className="filterMovies">
            {
                moviesList.response ? moviesList.datas.map((movie: any) => (
                    <CardMovie id={movie.imdbID} img={movie.Poster} type={movie.Type} name={movie.Title} year={movie.Year}/>

                ))
                : <></>
            }

        </div>
        </>
    )
}

export default FilterMovies