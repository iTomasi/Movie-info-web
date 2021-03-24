import React from "react";
import "./css/cardMovie.css";

interface ICardMovieProps {
    img: string,
    name: string,
    year: string,
    type: string,
    id: string
}

const CardMovie = ({id, img, name, year, type}: ICardMovieProps) => {
    return (
        <div className="card-search">
            <img src={img} alt={name}/>

            <h3 className="card-search__name">{name} ({year})</h3>

            <div className="card-search__flex">
                <span>{type}</span>
                <button type="button" onClick={() => window.location.href = "/movie/" + id}>More Info</button>
            </div>
        </div>
    )
}

export default CardMovie;