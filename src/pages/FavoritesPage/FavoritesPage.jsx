import React from "react";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";


import './FavoritesPage.scss';

import img from '../../assets/img/favoritespage.png';


const FavoritesPage = () => {
    return (  
        <>
            <Header/>
            <div className="favoritespage">
                <h2 className="favoritespage__title">Favourites page</h2>
                <img src={img} alt="lol" />
            </div>
            <Footer/>
        </>
    );
}
 
export default FavoritesPage;