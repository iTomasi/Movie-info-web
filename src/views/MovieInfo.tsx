import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

const MovieInfo = () => {

    const {id}: any = useParams();
    useEffect(() => {
        fetch("http://www.omdbapi.com/?apikey=675192f0&i=" + id)
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }, [])



    return (
        <h1>Ola</h1>
    )
}

export default MovieInfo;