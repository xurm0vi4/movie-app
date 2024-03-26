import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Pagination} from 'swiper/modules';
import { NavLink, Link, Routes, Route, useNavigate } from "react-router-dom";

import ListPage from "../../pages/ListPage/ListPage";

import './FullSlider.scss';
import 'swiper/swiper-bundle.css';


const FullSlider = ({movies, title, imgLink, type}) => {
    const camelCase = str => str.replace(/\s+(.)/g, m => m[1].toUpperCase());
    //useLocation, useNavigation, page props in the end of the link
    
    const navigate = useNavigate();

    const pagination = {
        clickable: true,
        dynamicBullets: true
    };
    return (  
        <div className="fullslider">
            <div className="fullslider__top">
                <h2 className="fullslider__title">{title}</h2>
                <button onClick={() => navigate(`/list/${type}/${camelCase(title)}`, {state:{title, type}})} className="fullslider__more">See All {">"}</button>
            </div>
            <Swiper 
                spaceBetween={20} 
                slidesPerView={1.1} 
                autoplay={{delay: 4000, disableOnInteraction: false}} 
                modules={[Autoplay, Pagination]} 
                loop={true} 
                centeredSlides={true}
                pagination={pagination}
                
                className="fullslider__swiper" 
                >
                {movies.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <NavLink to={`/film/${movie.id}`}>
                            <img src={imgLink + movie.backdrop_path} alt={movie.title}  />
                        </NavLink>
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    );
}
 
export default FullSlider;