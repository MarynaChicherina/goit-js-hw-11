
export const renderCards = (collection) =>{
    return collection.hits.map(({webformatURL, largeImageURL, tags, likes, comments, downloads, views}) => {
        return 
        `<div class="photo-card">
         <a class="photo-card_link" href="${largeImageURL}">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" width = 360px height = 260px/></a>
         <div class="info">
         <p class="info-item">
         <b>'${likes}'</b>
         </p>
         <p class="info-item">
         <b>'${views}'</b>
         </p>
         <p class="info-item">
         <b>'${comments}'</b>
         </p>
         <p class="info-item">
         <b>'${downloads}'</b>
         </p>
         </div>
         </div>`
    }).join('')
}

export const updateLoadButton = (currentPage) => {
    const btnEl = document.querySelector('.load-more');
    btnEl.dataset.page = Number(currentPage) + 1;
}

export const clearGallery = () => {
    const galleryEl = document.querySelector('.gallery');
    galleryEl.innerHTML = '';
}