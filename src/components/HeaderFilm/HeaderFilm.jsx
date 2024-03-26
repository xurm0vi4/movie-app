import React from "react";

import back from '../../assets/img/arrow-left.svg';
import bookmark from '../../assets/img/bookmark.svg';

import './HeaderFilm.scss';
import { NavLink } from "react-router-dom";

const HeaderFilm = () => {
    return (  
        <header className="header-film">
            <NavLink to='/'><img src={back} alt="back" className="header__back" /></NavLink>
            <img src={bookmark} alt="bookmark" className="header__bookmark" />
        </header>
    );
}
 
export default HeaderFilm;