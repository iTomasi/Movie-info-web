import React, {useState} from "react";
import "./css/featMovie.css";

interface IFeatMovieProps {
    img: string,
    id: string
}

const FeatMovie = ({img, id}: IFeatMovieProps) => {

    const [displayInfo, setDisplayInfo] = useState<boolean>(false)

    const showInfo = () => setDisplayInfo(true)
    const hiddeInfo = () => setDisplayInfo(false)

    return (
        <div className="card">
            <img src={img} alt="Movie" onMouseEnter={showInfo} />

            <div className="card__info" onMouseLeave={hiddeInfo} style={{display: displayInfo ? "flex" : "none"}} onClick={() => window.location.href = "/movie/" + id}>
                <h2>Fast and furious</h2>
                <h2>5 stars</h2>
                <h2>94%</h2>
            </div>
        </div>
    )
}

export default FeatMovie;