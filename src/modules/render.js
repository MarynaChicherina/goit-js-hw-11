export function renderCards(cards){
    return cards.hits.map(({ webformatURL, largeImageURL, tags, likes, comments, downloads, views }) => {
        return `<div class="photo-card">
         <a class="photo-card_link" href="${largeImageURL}">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" width = 360px height = 260px/>
         </a>
         <ul class="info">
         <li class="info_li">
         <b class="info-item">Likes:</b><p>${likes}</p></li>
         <li class="info_li">
         <b class="info-item">Views:</b><p>${views}</p></li>
         <li class="info_li">
         <b class="info-item">Comments:</b><p>${comments}</p></li>
         <li class="info_li">
         <b class="info-item">Downloads:</b><p>${downloads}</p></li>
         </ul>
         </div>`
    }).join('')
}