import React from "react";
import { Routes, Route } from "react-router-dom";

import FilmPage from "./pages/FilmPage/FilmPage";
import SeriesPage from "./pages/SeriesPage/SeriesPage";
import HomePage from "./pages/HomePage/HomePage";
import ListPage from "./pages/ListPage/ListPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import FilterPage from "./pages/FilterPage/FilterPage";

function App() {
  
  const imgLink = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<HomePage imgLink={imgLink}/>}/>      
        <Route path="/series/:id" element={<SeriesPage imgLink={imgLink}/>}/>  
        <Route path="/film/:id" element={<FilmPage imgLink={imgLink}/>}/> 
        <Route path='/list/:type/:title' element={<ListPage imgLink={imgLink}/>}/>
        <Route path='/search' element={<SearchPage imgLink={imgLink}/>}/>
        <Route path='/account' element={<AccountPage/>}/>
        <Route path='/favorites' element={<FavoritesPage imgLink={imgLink}/>}/>
        <Route path='/filter' element={<FilterPage imgLink={imgLink}/>}/>
      </Routes>
    </div>
  );
}

export default App;
