import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import back from '../../assets/img/arrow-left.svg';

import './SearchPage.scss';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const SearchPage = ({imgLink}) => {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState('movie');
    const [filmsActive, setFilmsActive] = useState(true);
    const [seriesActive, setSeriesActive] = useState(false);

    useEffect(() => {
        const searchLink = `https://api.themoviedb.org/3/search/${type}?api_key=598f69a2eb3403d2b38f08227e63c567&page=${page}&query=${searchQuery}`;
        const discoverLink = `https://api.themoviedb.org/3/discover/${type}?api_key=598f69a2eb3403d2b38f08227e63c567&page=${page}`;
        fetch(searchQuery ? searchLink : discoverLink)
            .then(res => res.json())
            .then(json => {
                setItems(json.results)
                setTotalPages(json.total_pages);
            })
            .catch(() => alert('Error'));
        window.scrollTo(0, 0);
    }, [searchQuery, page, type])
    
    console.log(type);
    console.log(filmsActive);
    console.log(seriesActive);

    return (
        <>
            <Header/>
            <div className="searchpage">
                <div className="searchpage__header">
                    <div className="searchpage__header-top">
                        <div className="searchpage__title">
                            <h3>Search</h3>
                            <span style={{textDecoration: filmsActive ? 'underline' : '', textDecorationColor: filmsActive ? '#E82626' : ''}} onClick={() => {
                                setType('movie');
                                setFilmsActive(true);
                                setSeriesActive(false);
                                setPage(1);
                                }}>films</span>/
                            <span style={{textDecoration: seriesActive ? 'underline' : '', textDecorationColor: seriesActive ? '#E82626' : ''}} onClick={() => {
                                setType('tv');
                                setFilmsActive(false);
                                setSeriesActive(true);
                                setPage(1);
                            }}>series</span>
                        </div>
                    </div>
                    <div className="searchpage__header-search">
                        <input type="text" placeholder="Enter the name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                        <button onClick={() => setPage(1)}>Show all</button>
                    </div>
                </div>
                <div className="searchpage__items">
                    {items.map(item => (
                        <NavLink to={`/${type === 'tv' ? 'series' : 'film'}/${item.id}`} key={item.id} >
                            {item.poster_path && (
                                <div className="searchpage__card">
                                    <img src={imgLink + item.poster_path} alt={item.title} className="searchpage__card-img" />
                                    <h4 className="searchpage__card-title">{item.title}</h4>
                                </div>
                            )}

                        </NavLink>
                    ))}
                </div>
                <ul className="searchpage__pagination">
                    {
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

export default SearchPage;