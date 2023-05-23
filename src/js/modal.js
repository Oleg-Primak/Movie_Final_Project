
import {API_URL}from "./api"
import {API_KEY }from "./api"
import {getClassByRating }from "./api"

const modal = document.querySelector(".modal");

async function openWindow(id) {
    const resp = await fetch(API_URL + id, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });

    const respData = await resp.json();
    
    modal.classList.add("modal__show")
    document.body.classList.add("stop-scrolling")

    modal.innerHTML = `
        <div class="modal__card">
      <img class="modal__poster"
          src="${respData.posterUrlPreview}" alt=""
      />
      
      <ul class="modal-info">
        <li>
          <h3 class="modal__title">${respData.nameRu}</h3>
        </li>
        <li>
          <div class="modal__genres">
          ${
            respData.ratingKinopoisk ? `<span class="movie__rating_${getClassByRating(respData.ratingKinopoisk)}">${respData.ratingKinopoisk}</span>` : ''
          }
            <span>${respData.year}</span>
            <span>${respData.genres.map((el) => ` <span>${el.genre}</span>`)}.</span>
            <span>${respData.countries[0].country}</span>
            <span>${respData.filmLength} мин</span>
          </div>
        </li>
        <li class="modal__description">
          ${ respData.description ? `<span>${respData.description}</span>` : '' }
        </li>
        <li>
          <button class="button-show button-next">
            <svg width="1.4rem" height="1.4rem" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" data-tid="b6d52236"><path d="M6 3.375L21 12L6 20.625V3.375Z" fill="white"></path></svg>
            play
          </button>
        </li>
      </ul>
      <button class="button-close">&#10006;</button> 
  </div>  
    `
    const button = document.querySelector(".button-show");
    const buttonClose = document.querySelector(".button-close");

    button.addEventListener('click', () => {
    window.open(`${respData.webUrl.replace("www.kinopoisk.ru", "1ww.frkp.live")}`);
  });
    
  buttonClose.addEventListener('click', () => closeModal());
 
}

function closeModal() {
  modal.classList.remove("modal__show")
  document.body.classList.remove("stop-scrolling")
}  

window.addEventListener('click', (e) => {
   if(e.target === modal){
    closeModal()
   }
})

export default openWindow;