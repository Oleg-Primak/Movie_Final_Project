import {API_URL_POPULAR}from "./api";
import { createLoader } from "./loader";
import getMovies from "./api"

const modal = document.querySelector(".modal");

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


const update = async () => {
  modal.insertAdjacentHTML('beforeend', createLoader());
  
  await getMovies(API_URL_POPULAR + count());

  document.querySelector('#loader').remove() 
};

const createNextPage = (page) => {
    const button = document.querySelector(".button-next");

    button.addEventListener('click', () => {
        topFunction() 
        update(page)
    });    
    
}

export default  createNextPage;