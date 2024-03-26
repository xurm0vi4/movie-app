import React, { useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './FilterPage.scss';
import { NavLink } from 'react-router-dom';


const FilterPage = ({imgLink}) => {
    const [genre, setGenre] = useState(null);
    const [allGenres, setAllGenres] = useState([]);
    const [type, setType] = useState('movie');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=598f69a2eb3403d2b38f08227e63c567`)
        .then(res => res.json())
        .then(json => {
            setAllGenres(json.genres);
            
        })
        .catch(() => alert('Error'));
    }, [type]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genre}&api_key=598f69a2eb3403d2b38f08227e63c567`)
        .then(res => res.json())
        .then(json => {
            setItems(json.results);
            setTotalPages(json.total_pages);
        })
        .catch(() => alert('Error'));
        window.scrollTo(0, 0);
    }, [type, genre, page])

    console.log(type, genre, page);
    console.log(allGenres);
    console.log(items);

    return (  
        <>
            <Header/>
            <div className="filterpage">
                <div className="filterpage__types">
                    <button onClick={() => {
                        setType('movie');
                        setGenre(null);
                        }} className={`filterpage__type ${type === 'movie' ? 'active' : ''}`}>Film</button>
                    <button onClick={() => {
                        setType('tv');
                        setGenre(null);
                        }} className={`filterpage__type ${type === 'tv' ? 'active' : ''}`}>Series</button>
                </div>
                <div className="filterpage__genres">
                    {allGenres && allGenres.map((item) => (
                        <button onClick={() => {
                            setGenre(item.id);
                        }} key={item.id} className={`filterpage__genre ${genre === item.id ? 'active' : ''}`}>{item.name}</button>
                    ))}
                </div>
                <div className="filterpage__items">
                    {items.map(item => (
                        <NavLink to={`/${type === 'tv' ? 'series' : 'film'}/${item.id}`} key={item.id} >
                            {item.poster_path && (
                                <div className="filterpage__card">
                                    <img src={imgLink + item.poster_path} alt={item.title} className="filterpage__card-img" />
                                    <h4 className="filterpage__card-title">{item.title}</h4>
                                </div>
                            )}

                        </NavLink>
                    ))}
                </div>
                <ul className="filterpage__pagination">
                    {totalPages !== 1 &&
                        [...Array(totalPages > 10 ? 10 : totalPages)].map((_, i) => (
                            <li key={i} onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
                        ))
                    }
                </ul>
            </div>
            <Footer/>
        </>
    );
}
 
export default FilterPage;