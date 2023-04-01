
import Notiflix from 'notiflix';
//import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getPictures } from './modules/pixabayClient';
import { renderCards, updateLoadButton, clearGallery } from './modules/cards';

const formEl = document.querySelector('#search-form');
const btnEl = document.querySelector('.load-more');

let currentPage = 1;
let searchState = '';

const lightbox = new SimpleLightbox('.gallery a',
{ captionsData: 'alt',  captionDelay: 250 });

formEl.addEventListener('submit', onSearchBtnSubmit);
btnEl.addEventListener('click', onLoadMoreBtnClick);

const fetchCards = (search, page) => getPictures(search, page)
.then(collection => {
    renderCards(collection);
    updateLoadButton(page);
}).catch(e => console.log(e));

function onSearchBtnSubmit(e) {
    e.preventDefault();
    const search = e.currentTarget.elements.searchQuery.value.trim();
    if(search !== searchState) {
        searchState = search;
        currentPage = 1;
        clearGallery();
        fetchCards(search, 1);
    } else if(collection.total === 0) {
        btnEl.classList.add('is-hidden');
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
        galleryEl.insertAdjacentHTML('beforeend', renderCards(collection));
        Notiflix.Notify.success(`Hooray! We found ${collection.totalHits} images.`);
        currentPage +=1;
        btnEl.classList.remove('is-hidden');
    }
}

function onLoadMoreBtnClick() {
    lightbox.refresh();
    const page = btnEl.dataset.page;
    const search = e.currentTarget.elements.searchQuery.value;
    fetchCards(search, page);
};



