import getMovies from "./api"
import getMoviesSlider from "./slider"
import input from "./search"
import createNextPage from "./pagination"

import { API_URL_POPULAR }from "./api"
import {API_URL_PREMIER}from "./api"


document.addEventListener('DOMContentLoaded', () => {
    getMovies(API_URL_POPULAR + 1);  
    getMoviesSlider(API_URL_PREMIER);
    input();
    createNextPage()
})