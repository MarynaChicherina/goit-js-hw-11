import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { renderCards } from './modules/render';


const formEl = document.querySelector('#search-form'),
const galleryEl = document.querySelector('.gallery'),
const btnEl = document.querySelector('.load-more')

const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34919738-c388ab985a0a958ff32217f62';

let searchValue = '';
let currentPage = 1;

formEl.addEventListener('submit', onSearchBtnSubmit);
btnEl.addEventListener('click', onLoadMoreBtnClick);

function onSearchBtnSubmit(e){
        renewPage();
        e.preventDefault();
        clearGallery();
        searchValue = e.currentTarget.elements.searchQuery.value.trim();
        const params = new URLSearchParams({
            q: searchValue,
            key: API_KEY,
            image_type: "photo",
            orientation:  "horizontal",
            safesearch: "true",
            per_page: 40,
            page: currentPage
            });
        const url = `${BASE_URL}?${params.toString()}`;
        
if (searchValue === '') {
    btnEl.classList.add('is-hidden');
    
}
else{
  getPictures(url).then(cards => {
    if (cards.total === 0) {
      btnEl.classList.add('is-hidden');
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
   } else {
      Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
    }
  })
}
}

async function getPictures(url) {
    try {
    const response = await axios(url);
    const cards = response.data;
    galleryEl.insertAdjacentHTML('beforeend', renderCards(cards));
    currentPage +=1;
    btnEl.classList.remove('is-hidden');
    lightbox.refresh();
    return cards;
  } catch {
    btnEl.classList.add('is-hidden');
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
 }
}

function onLoadMoreBtnClick() {
    getPictures(url);
  }

function clearGallery(){
    galleryEl.innerHTML ='';
  }
  
function renewPage(){
    currentPage = 1;
  }





