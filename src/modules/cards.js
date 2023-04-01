
export const renderCards = (collection) =>{
    const picturesContainer = document.querySelector('.gallery');
    picturesContainer.innerHTML = '';
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
