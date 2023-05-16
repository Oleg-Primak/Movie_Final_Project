import getMoviesSlider from "./slider"
import input from "./search"

export const API_KEY = "71e4be4e-4f2a-4f15-b324-5b6a6285bd0c";

const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";

export const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_URL_PREMIER =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY";

export const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
 

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const respData = await resp.json();
    console.log(respData);
    showMovies(respData)
}

function getClassByRating(number) {
    if (number >= 7) {
        return "green";
    } else if (number > 5) {
        return "orange";
    } else {
        return "grey";
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
    //const moviesTitle = document.querySelector(".title");

    document.querySelector(".movies").innerHTML = "";
    

    data.films.forEach(movie => {
        const movieEl = document.createElement("li");
        movieEl.classList.add("movies__item");
        movieEl.innerHTML = `
            
            <div class="movie__cover_inner">
            <img 
                src="${movie.posterUrlPreview}" 
                alt="${movie.nameRu}"
                class="movie__cover"
            />
            <div class="movie__cover_darkened"></div>
            </div>
            <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map((el) => ` <span>${el.genre}</span>`)}</div>
            ${
                movie.rating > 0 &&
                `
                <div class="movie__rating movie__rating_${getClassByRating(movie.rating)}">${movie.rating}</div> 
                </div>
                `
            }
        </div>
        `;

    movieEl.addEventListener("click", () => openWindow(movie.filmId))
    moviesEl.appendChild(movieEl);
    });
}

// modal new-page

async function openWindow(id) {
    const resp = await fetch(API_URL + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const respData = await resp.json();
    console.log(respData);
    console.log(id)
    window.open(`${respData.webUrl}`)
}


//pagination


function topFunction() {
    document.documentElement.scrollTop = 650;
}

let page = 2;

function count() {
    if (page <= 5) {
       return page++
    }else if(page > 5) {
        return page = 1
    }
}
const createNextPage = (page) => {
    const button = document.querySelector(".button-next");

    button.addEventListener('click', () => {
        getMovies(API_URL_POPULAR + count());
        topFunction() 
    });    
}
 
document.addEventListener('DOMContentLoaded', () => {
    getMovies(API_URL_POPULAR + 1);  
    getMoviesSlider(API_URL_PREMIER);
    input();
    createNextPage()
})
 


export default getMovies;