import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.loading-more');

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34919738-c388ab985a0a958ff32217f62';

let currentPage = 1;
let searchValue = '';


formEl.addEventListener('submit', onSearchBtnSubmit);
btnEl.addEventListener('click', onLoadMoreBtnClick);

function onSearchBtnSubmit(e) {
    e.preventDefault;
    const searchValue = e.currentTarget.elements.searchQuery.value.trim();
    if(!searchValue) {
        return
    }
    fetchPictures(searchValue).then(pictures => {
        gallery.innerHTML = '';
        
    }).catch(() => {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    });
}

function fetchPictures(search, page) {
    return fetch('${BASE_URL}/?key={API_KEY}&q={searchValue}&image_type=photo&orientation=horizontal&safesearch=true')
    .then(res => res.json());
}