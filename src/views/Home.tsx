import React, {useState, useEffect} from "react";
import FeatMovie from "../components/FeatMovie";
import "./css/home.css";

const Home = () => {

    const [moviesList, setMoviesList] = useState<string[]>([]);

    useEffect(() => {
        fetch("http://www.omdbapi.com/?&apikey=675192f0&s=furious")
            .then(res => res.json())
            .then(res => {
                setMoviesList(res.Search)
            })
    }, [])

    const scrollCarousel = (e: any) => {
        const carouselDiv: any = document.querySelector(".movies__api-carousel");

        if (e.target.classList.contains("i__row-left")) {
            carouselDiv.scrollLeft -= carouselDiv.offsetWidth;
        }

        else if (e.target.classList.contains("i__row-right")) {
            carouselDiv.scrollLeft += carouselDiv.offsetWidth;
        }
    }

    return (
        <div className="content">

            <h2>Featured Movies</h2>

            <div className="movies__api">
                <i className="i__row-left i__rows-properties fas fa-chevron-left" onClick={scrollCarousel}></i>

                <div className="movies__api-carousel" data-id="1">{
                    moviesList.map((movie: any) => (
                        <FeatMovie img={movie.Poster} id={movie.imdbID} />
                    ))
                }</div>

                <i className="i__row-right i__rows-properties fas fa-chevron-right" onClick={scrollCarousel}></i>

            </div>

            <h2>My Favorities Movies</h2>

            <div className="movies__favorites">
                
            </div>
        </div>
    )
}

export default Home