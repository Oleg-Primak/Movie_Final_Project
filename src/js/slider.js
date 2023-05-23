import {API_KEY }from "./api"
import {API_URL}from "./api"
  
let offset = 0;
const sliderLine = document.querySelector('.slider-line');
let imgs = document.querySelectorAll("img");

document.querySelector('.button__next').addEventListener('click', function() {
    offset = offset + 256;
    
    if(offset >= 4096) {
       offset = 0;
    }
    sliderLine.style.left = - offset + 'px';
});

document.querySelector('.button__prev').addEventListener('click', function() {
  offset = offset - 256;
  
  if(offset < 0) {
     offset = 3840;
  }
  sliderLine.style.left = - offset + 'px';
});

async function getMoviesSlider(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const respData = await resp.json();
    console.log(respData);
    showMoviesSlider(respData)
}

function showMoviesSlider(data) {
    const moviesEl = document.querySelector(".slider-line");

    data.items.forEach(movie => {
        const movieEl = document.createElement("li");
       // movieEl.classList.add("img");
        movieEl.innerHTML = `

             <img class="img" 
             src="${movie.posterUrlPreview}" alt=""
             />
             
        `;
    moviesEl.appendChild(movieEl);
    movieEl.addEventListener("click", () => openWindow(movie.kinopoiskId))
    });
}

async function openWindow(id) {
  const resp = await fetch(API_URL + id, {
      headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
      },
  });

  const respData = await resp.json();
  window.open(`${respData.webUrl.replace("www.kinopoisk.ru", "1ww.frkp.live")}`)
}

export default getMoviesSlider;