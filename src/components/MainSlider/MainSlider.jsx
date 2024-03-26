import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import { NavLink } from "react-router-dom";

import './MainSlider.scss';
import 'swiper/swiper-bundle.css';

const MainSlider = ({imgLink}) => {
    const [movieList, setMovieList] = useState([]);


    useEffect(() =>{
        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=598f69a2eb3403d2b38f08227e63c567')
        .then(res => res.json())
        .then(json => setMovieList(json.results))
    }, [])

    return (  
        <Swiper spaceBetween={15} slidesPerView={1.2} autoplay={{delay: 5000, disableOnInteraction: false}} modules={[Autoplay]} centeredSlides={true} loop={true}>
            {movieList.map((movie) =>(
                <SwiperSlide key={movie.id} id="mainslider">
                    <NavLink to={`/film/${movie.id}`}>
                        <img src={imgLink + movie.backdrop_path} alt={movie.title} />
                    </NavLink>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
 
export default MainSlider;