import React, { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MainSlider from "../../components/MainSlider/MainSlider";
import Slider from "../../components/Slider/Slider";
import FullSlider from "../../components/FullSlider/FullSlider";
import ListPage from "../ListPage/ListPage";

const HomePage = ({imgLink}) => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [comingSoon, setComingSoon] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const [bestSeries, setBestSeries] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=598f69a2eb3403d2b38f08227e63c567')
            .then(res => res.json())
            .then(json => setPopularMovies(json.results))
            .catch(() => alert('Error'));

        fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=598f69a2eb3403d2b38f08227e63c567')
            .then(res => res.json())
            .then(json => setComingSoon(json.results))
            .catch(() => alert('Error'));

        fetch('https://api.themoviedb.org/3/trending/tv/week?api_key=598f69a2eb3403d2b38f08227e63c567')
            .then(res => res.json())
            .then(json => setPopularSeries(json.results))
            .catch(() => alert('Error'));

        fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=598f69a2eb3403d2b38f08227e63c567')
            .then(res => res.json())
            .then(json => setBestSeries(json.results))
            .catch(() => alert('Error'));
    }, [])
    return (
        <>
            <Header />
            <MainSlider imgLink={imgLink} />
            <Slider title="Popular" movies={popularMovies} imgLink={imgLink} slidesPerView={2.2} time={2500} type='film'/>
            <FullSlider movies={comingSoon} title="Coming soon" imgLink={imgLink} type='film' />
            <Slider title="Popular series" movies={popularSeries} imgLink={imgLink} slidesPerView={2.2} time={3000} type='series'/>
            <Slider title="Best series" movies={bestSeries} imgLink={imgLink} slidesPerView={2.2} time={3500} type='series'/>
            <Footer />
        </>
    );
}

export default HomePage;