import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import './Slider.scss';



const Slider = ({ movies, title, imgLink, slidesPerView, centeredSlides, time, type, id }) => {
    const camelCase = str => str.replace(/\s+(.)/g, m => m[1].toUpperCase());
    const navigate = useNavigate();
    return (
        <div className="slider">
            <div className="slider__top">
                <h2 className="slider__title">{title}</h2>
                <button onClick={() => navigate(`/list/${type}/${camelCase(title)}`, {state:{title, type, id}})} className="slider__more">See All {">"}</button>
            </div>
            <Swiper
                spaceBetween={15}
                slidesPerView={slidesPerView}
                autoplay={{ delay: time, disableOnInteraction: false }}
                modules={[Autoplay]}
                loop={true}
                centeredSlides={centeredSlides}
                className="slider__swiper"
            >
                {movies.map(movie => (
                    <div key={movie.id}>
                        {movie.poster_path &&
                            (
                                <SwiperSlide key={movie.id}>

                                    <NavLink to={`/${type}/${movie.id}`}>
                                        <img src={imgLink + movie.poster_path} alt={movie.title} />
                                    </NavLink>
                                </SwiperSlide>
                            )}

                    </div>
                ))}
            </Swiper>

        </div>
    );
}

export default Slider;