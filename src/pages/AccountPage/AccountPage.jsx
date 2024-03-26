import React from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import './AccountPage.scss';

import img from '../../assets/img/accountpage.png';


const AccountPage = () => {
    return (  
        <>
            <Header/>
            <div className="accountpage">
                <h2 className="accountpage__title">Account page</h2>
                <img src={img} alt="lol" />
            </div>
            <Footer/>
        </>
    );
}
 
export default AccountPage;