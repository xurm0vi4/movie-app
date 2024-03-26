import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import './ListPage.scss';

import back from '../../assets/img/arrow-left.svg';
import Footer from "../../components/Footer/Footer";

const ListPage = ({ imgLink }) => {
    const [movies, setMovies] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const params = useParams();
    const location = useLocation();
    const title = location.state.title;
    const type = params.type;
    const id = location.state.id;

    const link = 'https://api.themoviedb.org/3/';
    const links = [
        'discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=598f69a2eb3403d2b38f08227e63c567',
        'movie/upcoming?api_key=598f69a2eb3403d2b38f08227e63c567',
        'trending/tv/week?api_key=598f69a2eb3403d2b38f08227e63c567',
        'tv/top_rated?api_key=598f69a2eb3403d2b38f08227e63c567',
        `${type === 'series' ? 'tv' : 'movie'}/${id}/recommendations?api_key=598f69a2eb3403d2b38f08227e63c567`
    ];
    
    console.log(params, location);

    const createLink = () => {
        if (params.title === 'ComingSoon') {
            return link + links[1] + `&page=${page}`;
        }
        if (params.title === 'Popular') {
            return link + links[0] + `&page=${page}`;
        }
        if (params.title === 'PopularSeries') {
            return link + links[2] + `&page=${page}`;
        }
        if (params.title === 'BestSeries') {
            return link + links[3] + `&page=${page}`;
        }
        if (params.title === 'MoreLikeThis' && id) {
            return link + links[4] + `&page=${page}`;
        }
    }
    useEffect(() => {
        fetch(createLink(page))
            .then(res => res.json())
            .then((json) => {
                setMovies(json.results)
                setTotalPages(json.total_pages)
            })
            .catch(() => alert('Error'));
        window.scrollTo(0, 0);
    }, [page])


    return (
        <>
            <div className="listpage">
                <NavLink to='/'><img src={back} alt="back" className="listpage__back" /></NavLink>
                <h2 className="listpage__title">{title}</h2>
                <div className="listpage__flex">
                    {movies && movies.map((movie) => (
                        <NavLink to={`/${type}/${movie.id}`} key={movie.id} >
                        {movie.poster_path && (
                            <div className="listpage__card">
                                <img src={imgLink + movie.poster_path} alt={movie.title} className="listpage__card-img" />
                                <h4 className="listpage__card-title">{movie.title}</h4>
                            </div>
                        )}
                        
                        </NavLink>
                    ))}
                </div>
                <ul className="listpage__pagination">
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

export default ListPage;