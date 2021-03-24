import React from "react";
import {NavLink} from "react-router-dom";
import "./css/header.css";

const Header = () => {

    const searchingMovie = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)

        window.location.href = "/movie-search=" + formData.get("movie")
        
    }

    return (
        <header className="iw_header">
            <div className="iw_header__left">
                <h2>OMDB API</h2>
            </div>
            
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>
            </nav>

            <div className="iw_header__right">
                <form onSubmit={searchingMovie}>
                    <input type="text" placeholder="Search a Movie..." name="movie" />
                </form>
            </div>
        </header>
    )
}

export default Header;