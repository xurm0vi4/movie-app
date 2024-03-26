import React, { useState } from "react";

import logo from '../../assets/img/logo.png';

import './Header.scss';
import { NavLink } from "react-router-dom";

const Header = () => {
    const [headerActive, setHeaderActive] = useState(false);
    return (
        <header className="header">
            <NavLink to='/' className="header__logo">
                <img src={logo} alt="logo" />
            </NavLink>
            <nav className="header__nav">
                <NavLink to='/search'>
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_13_3)">
                            <path d="M9.16666 16.6667C13.3088 16.6667 16.6667 13.3088 16.6667 9.16667C16.6667 5.02454 13.3088 1.66667 9.16666 1.66667C5.02452 1.66667 1.66666 5.02454 1.66666 9.16667C1.66666 13.3088 5.02452 16.6667 9.16666 16.6667Z" stroke="#A4A3A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.3333 19.1667L14.1667 15" stroke="#A4A3A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13_3">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg> 
                </NavLink>
                <NavLink to='/filter'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="#A4A3A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </NavLink>
                <NavLink className="burger-menu" onClick={() => setHeaderActive((prev) => !prev)}>
                    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.375 12.5H23.625" stroke="#A4A3A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.375 5.75H23.625" stroke="#A4A3A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.375 19.25H23.625" stroke="#A4A3A9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </NavLink>
            </nav>
            <nav className={`header__menu ${headerActive ? 'active' : ''}`}>
                <NavLink className="header__menu-link" to='/' onClick={() => setHeaderActive(false)} >
                    Home
                </NavLink>
                <NavLink className="header__menu-link" to='/search' onClick={() => setHeaderActive(false)}>
                    Search
                </NavLink>
                <NavLink className="header__menu-link" to='/favorites' onClick={() => setHeaderActive(false)}>
                    Favorites
                </NavLink>
                <NavLink className="header__menu-link" to='/account' onClick={() => setHeaderActive(false)}>
                    Account
                </NavLink>
            </nav>
        </header>
    );
}


export default Header;