import getMovies from "./api"
import {API_URL_SEARCH} from "./api"

const form = document.querySelector("form");
const search = document.querySelector(".header__search");
const sliderNone = document.querySelector(".container-slider");
const removeIcon = document.getElementById("remove");
const button = document.querySelector(".button-next");
const title = document.querySelector(".header__title")

function input() {
    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
        if (search.value) {
            getMovies(apiSearchUrl)
            sliderNone.classList.add("none")
        } 
        

        search.value = "";
        document.querySelector(".title-search").innerHTML = "Результат поиска";
        document.querySelector(".header__logo").innerHTML = "Главная";
        
        button.classList.add("button-remove")
        title.remove()
    })

    removeIcon.addEventListener("click", () => {
        search.value = "";
    })
      
}

export default input;
