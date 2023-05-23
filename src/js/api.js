import openWindow from "./modal"

export const API_KEY = "71e4be4e-4f2a-4f15-b324-5b6a6285bd0c";

export const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";

export const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

export const API_URL_PREMIER =
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

export function getClassByRating(number) {
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
        
        movieEl.addEventListener("click", () => {openWindow(movie.filmId)
        console.log(movie.filmId)})
        moviesEl.appendChild(movieEl);
    });
}

export default getMovies;