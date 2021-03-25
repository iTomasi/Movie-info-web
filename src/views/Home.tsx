import React, {useState, useEffect} from "react";
import FeatMovie from "../components/FeatMovie";
import "./css/home.css";

const Home = () => {

    const [moviesList, setMoviesList] = useState<string[]>([]);
    const [favoritesList, setFavoritesList] = useState<any>(localStorage.getItem("favMovie"));

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_TOKEN_OMDB}&s=furious`)
            .then(res => res.json())
            .then(res => {
                setMoviesList(res.Search)
            })
    }, [])

    const scrollCarousel = (e: any) => {
        const gettingID = e.currentTarget.dataset.id;
        const divCarousel: any = document.getElementById(`carousel-${gettingID}`)

        if (e.target.classList.contains("i__row-left")) {
            divCarousel.scrollLeft -= divCarousel.offsetWidth
        }

        else if (e.target.classList.contains("i__row-right")) {
            divCarousel.scrollLeft += divCarousel.offsetWidth
        }
    }

    const FavMovieList = () => {
        try {
            const parseLocalStorageArray = JSON.parse(favoritesList)

            if (parseLocalStorageArray === null || parseLocalStorageArray[0] === undefined) {
                const movieFavDiv:any = document.querySelector(".movies__favorites")

                movieFavDiv.style.display = "none"
                return <></>
            }

            return (
                parseLocalStorageArray.map((movieFav: any) => (
                    <FeatMovie id={movieFav.imdbID} img={movieFav.poster} name={movieFav.title} year={movieFav.year} />
                ))
            )
        }

        catch(e) {}

        return <></>
    }

    return (
        <div className="content">

            <h2>Featured Movies</h2>

            <div className="movies__api">
                <i className="i__row-left i__rows-properties fas fa-chevron-left" onClick={scrollCarousel} data-id="1"></i>

                <div className="movies__api-carousel" id="carousel-1">{
                    moviesList.map((movie: any) => (
                        <FeatMovie img={movie.Poster} id={movie.imdbID} name={movie.Title} year={movie.Year} />
                    ))
                }</div>

                <i className="i__row-right i__rows-properties fas fa-chevron-right" onClick={scrollCarousel} data-id="1"></i>

            </div>

            <h2>My Favorities Movies</h2>

            <div className="movies__favorites">

                <i className="i__row-left i__rows-properties fas fa-chevron-left" onClick={scrollCarousel} data-id="2"></i>
                <div className="movies__favorites-carousel" id="carousel-2">
                    <FavMovieList/>
                </div>
                <i className="i__row-right i__rows-properties fas fa-chevron-right" onClick={scrollCarousel} data-id="2"></i>
            </div>
        </div>
    )
}

export default Home