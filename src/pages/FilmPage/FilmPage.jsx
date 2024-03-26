import React, { useEffect, useState } from "react";

import HeaderFilm from "../../components/HeaderFilm/HeaderFilm";
import Footer from "../../components/Footer/Footer";
import Slider from "../../components/Slider/Slider";
import { useParams } from "react-router-dom";

import './FilmPage.scss';



const FilmPage = ({imgLink}) => {
    const [recommendations, setRecommendations] = useState([]);
    const [data, setData] = useState({});

    const {id} = useParams();

    useEffect(() =>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=598f69a2eb3403d2b38f08227e63c567`)
            .then(res => res.json())
            .then(json => setRecommendations(json.results))
            .catch(() => alert('Error'));

            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=598f69a2eb3403d2b38f08227e63c567`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(() => alert('Error'));
    }, [id])

    console.log(data);

    const transformTime = () =>{
        const hours = Math.floor(data?.runtime / 60);
        const minutes = data?.runtime % 60;
        return [hours, minutes]
    }
    
    return (  
        <>
            <HeaderFilm/>
            <main className="film__main">
                <div className="film__banner" style={{backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), #1c1a29 ), url('${imgLink}${data?.backdrop_path}')`}}>
                    <div className="film__banner-flex">
                        <section className="film__banner-content">
                            <h2 className="film__banner-title">{data?.title}</h2>
                            <p className="film__banner-time">{transformTime()[0]} hour(s) {transformTime()[1]} minute(s)</p>
                            <ul className="film__banner-genres">
                                {data && data.genres?.map(genre => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                            <p className="film__banner-rate">{data?.vote_average?.toFixed(1)} / 10 from IMDb</p>
                            <p className="film__banner-likes">98% from users</p>
                            <button className="film__banner-button">Watch Now</button>
                        </section>
                        <div className="film__banner-img">
                            <img src={imgLink + data?.poster_path} alt="poster" />
                        </div>
                    </div>
                </div>
                <section className="film__sinopsis">
                    <h2 className="film__sinopsis-title">sinopsis</h2>
                    <p className="film__sinopsis-text">{data?.overview}</p>
                </section>
                {recommendations && <Slider movies={recommendations} imgLink={imgLink} slidesPerView={2.2} time={3000} title="More Like This" type='film' id={id}/>}
            </main>
            <Footer/>
        </>
    );
}
 
export default FilmPage;