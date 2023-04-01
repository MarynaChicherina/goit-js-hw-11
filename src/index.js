
import Notiflix from 'notiflix';
//import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getPictures } from './modules/pixabayClient';
import { renderCards } from './modules/cards';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.load-more');

let currentPage = 1;
let searchValue = '';


formEl.addEventListener('submit', onSearchBtnSubmit);
btnEl.addEventListener('click', onLoadMoreBtnClick);

function onSearchBtnSubmit(e) {
    resetPage();
    e.preventDefault;
    clearGallery();
    const searchValue = e.currentTarget.elements.searchQuery.value.trim();
    if (searchValue === ''){
        return
    } else {
        getPictures(searchValue, currentPage).then(collection => {
            if (collection.total === 0){
                btnEl.classList.add('is-hidden');
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            } else {
                galleryEl.insertAdjacentHTML('beforeend', renderCards(collection));
                Notiflix.Notify.success(`Hooray! We found ${collection.totalHits} images.`);
                currentPage +=1;
                btnEl.classList.remove('is-hidden');
            }        
        }).catch(() => {
            btnEl.classList.add('is-hidden');
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }) 
    } 
}

const lightbox = new SimpleLightbox('.gallery a',
 { captionsData: 'alt',  captionDelay: 250 });

function onLoadMoreBtnClick() {
    lightbox.refresh();
    getPictures(searchValue, currentPage);
}

function resetPage(){
    currentPage = 1;
  }

  function clearGallery(){
    galleryEl.innerHTML ='';
  } 