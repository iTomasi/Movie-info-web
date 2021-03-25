import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import "./css/movieInfo.css";

const MovieInfo = () => {

    const [movieInfo, setMovieInfo] = useState<any>({
        Rating: []
    })

    const [favoritesMovie, setFavoritesMovie] = useState<any>(localStorage.getItem("favMovie"))
    const [addingFavorites, setAddingFavorites] = useState<string[]>([])

    const {id}: any = useParams();
    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_TOKEN_OMDB}&i=` + id)
            .then(res => res.json())
            .then(res => {
                if (res.Response === "False") return console.log(res);
                const gettingRating = res.Ratings[0].Value.split("/")
                const moviePE = parseInt(gettingRating[0]) / 2;
                const maxPE = parseInt(gettingRating[1]) / 2
                let movieStars: any = [];
                
                for (let i = 0; i < maxPE; i++) {

                    if (Math.floor(moviePE) > i) {
                        movieStars = [...movieStars, <i className="i__star-full fas fa-star"></i>]
                    }

                    else if (Math.floor(moviePE) === i && moviePE % 1 !== 0) {
                        movieStars = [...movieStars, <i className="i__star-midle fas fa-star-half-alt"></i>]
                    }

                    else {
                        movieStars = [...movieStars, <i className="i__star-white far fa-star"></i>]
                    }
                }

                setMovieInfo({
                    imdbID: res.imdbID,
                    Title: res.Title,
                    Year: res.Year,
                    Released: res.Released,
                    Runtime: res.Runtime,
                    Director: res.Director,
                    Country: res.Country,
                    Poster: res.Poster,
                    Production: res.Production,
                    Rating: movieStars
                })
            })
    }, [])

    const add_or_remove = (e: any) => {
        if (e.currentTarget.classList.contains("i__heart-1")) {
            console.log("You will add to favorite")

            if (favoritesMovie === null) {
                localStorage.setItem("favMovie", JSON.stringify([{
                    imdbID: movieInfo.imdbID,
                    title: movieInfo.Title,
                    poster: movieInfo.Poster,
                    year: movieInfo.Year
                }]))

                e.currentTarget.setAttribute("class", "i__heart-2 fas fa-heart")
                return
            }

            const parseLocalStorageArray: any = JSON.parse(favoritesMovie)

            localStorage.setItem("favMovie", JSON.stringify([...parseLocalStorageArray, {
                imdbID: movieInfo.imdbID,
                title: movieInfo.Title,
                poster: movieInfo.Poster,
                year: movieInfo.year
            }]))

            e.currentTarget.setAttribute("class", "i__heart-2 fas fa-heart")
        }

        else if (e.currentTarget.classList.contains("i__heart-2")) {
            const parseLocalStorageArray = JSON.parse(favoritesMovie);

            const newArrayLocalStorage = parseLocalStorageArray.filter((movie: any) => movie.imdbID !== movieInfo.imdbID);

            localStorage.setItem("favMovie", JSON.stringify(newArrayLocalStorage))

            e.currentTarget.setAttribute("class", "i__heart-1 far fa-heart")
        }
    }

    const CheckingFavMovie = () => {

        try {

            const parseLocalStorageArray = JSON.parse(favoritesMovie)
            const validation = parseLocalStorageArray.filter((movie: any) => movie.imdbID === movieInfo.imdbID)

            console.log(validation)
            if (validation[0] !== undefined) {
                return (
                    <i className="i__heart-2 fas fa-heart" onClick={add_or_remove}></i>
                )
            }
        }

        catch(e) {
            return (
                <i className="i__heart-1 far fa-heart" onClick={add_or_remove}></i>
            )
        }

        return(<i className="i__heart-1 far fa-heart" onClick={add_or_remove}></i>)
    }


    return (
        <>
        <div className="movieInfo">

            <div className="movieInfo__img">
                <CheckingFavMovie/>
                <img src={movieInfo.Poster} alt={movieInfo.Title}/>
            </div>

            <div className="movieInfo__stats">
                <h2 className="movieInfo__stats-title">{movieInfo.Title} <span>({movieInfo.Year})</span></h2>
                <h2>
                    {movieInfo.Rating.map((star: any) => (star))}
                </h2>
                <h3>{movieInfo.Released}</h3>
                <h3>Director: {movieInfo.Director}</h3>
                <h3>Production: {movieInfo.Production}</h3>
                <h3>Country: {movieInfo.Country}</h3>
                <h3>Duration: {movieInfo.Runtime}</h3>
            </div>
        </div>
        </>
    )
}

export default MovieInfo;