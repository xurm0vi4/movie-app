import React, { useEffect, useState } from "react";

import HeaderFilm from "../../components/HeaderFilm/HeaderFilm";
import Footer from "../../components/Footer/Footer";
import Slider from "../../components/Slider/Slider";
import { useParams } from "react-router-dom";

import './SeriesPage.scss';

import poster from '../../assets/img/series-img.png';


const SeriesPage = ({ imgLink }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [data, setData] = useState({});
    const [seasonId, setSeasonId] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=598f69a2eb3403d2b38f08227e63c567`)
            .then(res => res.json())
            .then(json => setRecommendations(json.results))
            .catch(() => alert('Error'));

        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=598f69a2eb3403d2b38f08227e63c567`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(() => alert('Error'));
    }, [id])

    console.log(data)

    return (
        <>
            <HeaderFilm />
            <main className="series__main">
                <div className="series__banner" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), #1c1a29 ), url('${imgLink}${data?.backdrop_path}')` }}>
                    <div className="series__banner-flex">
                        <section className="series__banner-content">
                            <h2 className="series__banner-title">{data?.name}</h2>
                            <ul className="series__banner-genres">
                                {data && data.genres?.map(genre => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                            <p className="series__banner-rate">{data?.vote_average?.toFixed(1)} / 10 from IMDb</p>
                            <p className="series__banner-likes">98% from users</p>
                        </section>
                        <div className="series__banner-img">
                            <img src={imgLink + data?.poster_path} alt="poster" />
                        </div>
                    </div>
                </div>
                <section className="series__sinopsis">
                    <h2 className="series__sinopsis-title">sinopsis</h2>
                    <p className="series__sinopsis-text">{data?.overview}</p>
                </section>
                <div className="series__seasons">
                    <div className="series__seasons-top">
                        <select className="series__seasons-dropdown" onChange={(e) => setSeasonId(e.target.value)}>
                            {data?.seasons?.map((season, index) => (
                                <option key={season.id} value={season.season_number}>{season.name}</option>
                            ))}
                        </select>
                        <div className="series__seasons-rating">
                            <svg width="25" height="25" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.3027 7.57619C15.373 7.34181 15.4082 7.09963 15.4082 6.85353C15.4082 6.3008 15.2266 5.76955 14.8984 5.33595C14.9688 5.10158 15.0039 4.85939 15.0039 4.6133C15.0039 4.06056 14.8223 3.52931 14.4941 3.09572C14.5645 2.86134 14.5996 2.61916 14.5996 2.37306C14.5996 1.36525 14 0.457047 13.0703 0.0605631C12.9069 -0.00988887 12.7307 -0.0457966 12.5527 -0.0449057H0.8125C0.466797 -0.0449057 0.1875 0.234391 0.1875 0.580094V7.68947C0.1875 8.03517 0.466797 8.31447 0.8125 8.31447H3.33789L5.01367 14.3848C5.2832 15.3633 6.18164 16.0469 7.19727 16.0469C7.77734 16.0469 8.31836 15.8164 8.71875 15.3945C9.11914 14.9746 9.32422 14.4238 9.29492 13.8438L9.17773 11.4434H13.8633C14.0996 11.4434 14.3301 11.3809 14.5332 11.2617C15.3223 10.8028 15.8125 9.97072 15.8125 9.09377C15.8125 8.54103 15.6309 8.00978 15.3027 7.57619ZM1.59375 6.90627V1.35939H3.17578V6.90627H1.59375ZM13.8438 10.0391H7.70312L7.89062 13.9141C7.90234 14.1465 7.79883 14.3652 7.60547 14.5098C7.48633 14.5977 7.33984 14.6426 7.19336 14.6406C7.00621 14.6388 6.82471 14.5764 6.67609 14.4626C6.52747 14.3489 6.41977 14.19 6.36914 14.0098L4.42578 6.96877V1.35939H12.5391C12.7343 1.44688 12.9001 1.58891 13.0165 1.7684C13.1329 1.94788 13.195 2.15718 13.1953 2.37111C13.1953 2.56056 13.1504 2.74025 13.0605 2.90431L12.7891 3.40041L13.2168 3.7715C13.3372 3.87577 13.4337 4.00476 13.4998 4.14969C13.5658 4.29461 13.5999 4.45207 13.5996 4.61134C13.5996 4.8008 13.5547 4.98048 13.4648 5.14455L13.1934 5.64064L13.6211 6.01173C13.7415 6.11601 13.838 6.245 13.9041 6.38992C13.9701 6.53485 14.0042 6.69231 14.0039 6.85158C14.0039 7.04103 13.959 7.22072 13.8691 7.38478L13.5957 7.88283L14.0234 8.25392C14.1438 8.35819 14.2403 8.48718 14.3064 8.63211C14.3725 8.77704 14.4065 8.93449 14.4062 9.09377C14.4062 9.46681 14.1914 9.82619 13.8438 10.0391Z" fill="#A4A3A9" />
                            </svg>
                            <svg width="25" height="25" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1152 8.47267C15.4434 8.03908 15.625 7.50783 15.625 6.95509C15.625 6.07814 15.1348 5.24806 14.3457 4.78517C14.1426 4.66602 13.9113 4.60331 13.6758 4.60353H8.99219L9.10938 2.20314C9.13672 1.62306 8.93164 1.07228 8.5332 0.652358C8.33767 0.445382 8.10176 0.280704 7.84007 0.168501C7.57838 0.0562986 7.29645 -0.00104495 7.01172 1.44144e-05C5.99609 1.44144e-05 5.09766 0.683608 4.82812 1.66212L3.15039 7.73634H0.625C0.279297 7.73634 0 8.01564 0 8.36134V15.4707C0 15.8164 0.279297 16.0957 0.625 16.0957H12.3691C12.5488 16.0957 12.7246 16.0606 12.8867 15.9902C13.8164 15.5938 14.416 14.6856 14.416 13.6777C14.416 13.4317 14.3809 13.1895 14.3105 12.9551C14.6387 12.5215 14.8203 11.9902 14.8203 11.4375C14.8203 11.1914 14.7852 10.9492 14.7148 10.7149C15.043 10.2813 15.2246 9.75001 15.2246 9.19728C15.2207 8.95119 15.1855 8.70705 15.1152 8.47267ZM1.40625 14.6895V9.14259H2.98828V14.6895H1.40625ZM13.8359 7.79494L13.4082 8.16603L13.6797 8.66212C13.7691 8.82554 13.8155 9.00904 13.8145 9.19533C13.8145 9.51759 13.6738 9.82423 13.4316 10.0352L13.0039 10.4063L13.2754 10.9024C13.3648 11.0658 13.4112 11.2493 13.4102 11.4356C13.4102 11.7578 13.2695 12.0645 13.0273 12.2754L12.5996 12.6465L12.8711 13.1426C12.9605 13.306 13.0069 13.4895 13.0059 13.6758C13.0059 14.1133 12.748 14.5078 12.3496 14.6875H4.23828V9.08009L6.18164 2.03908C6.23175 1.85861 6.33932 1.69939 6.48805 1.58555C6.63678 1.47172 6.81857 1.40946 7.00586 1.40822C7.1543 1.40822 7.30078 1.45119 7.41797 1.53908C7.61133 1.68361 7.71484 1.90236 7.70312 2.13478L7.51562 6.00978H13.6562C14.0039 6.22267 14.2188 6.58205 14.2188 6.95509C14.2188 7.27736 14.0781 7.58205 13.8359 7.79494Z" fill="#A4A3A9" />
                            </svg>

                        </div>
                    </div>
                    <div className="series__seasons-content">
                        <div className="series__seasons-flex">
                            <div className="series__seasons-leftside">
                                <img src={`${imgLink}${data?.seasons && data?.seasons[seasonId].poster_path}`} alt="series img" />
                                <div className="series__seasons-data">
                                    <h4 className="series__seasons-title">{data?.seasons && data?.seasons[seasonId].name}</h4>
                                    <p className="series__seasons-number">{data?.seasons && data?.seasons[seasonId].episode_count} episodes</p>
                                    <p className="series__seasons-rates">{data?.seasons && data?.seasons[seasonId].vote_average} / 10 from IMDb</p>
                                </div>
                            </div>
                            <button onClick={() => console.log(seasonId)} className="series__seasons-button">Watching</button>
                        </div>
                        <p className="series__seasons-sinopsis">{data?.seasons && data?.seasons[seasonId].overview}</p>
                    </div>
                </div>
                {recommendations && <Slider movies={recommendations} imgLink={imgLink} slidesPerView={2.2} time={3000} title="More Like This" type='series' id={id}/>}
            </main>
            <Footer />
        </>
    );
}

export default SeriesPage;