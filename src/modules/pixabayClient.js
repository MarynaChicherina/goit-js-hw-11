export const getPictures = (search, page) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        q: search,
        key: '34919738-c388ab985a0a958ff32217f62',
        image_type: "photo",
        orientation:  "horizontal",
        safesearch: "true",
        per_page: 40,
        page
    });
    return fetch(`${BASE_URL}?${params.toString()}`)
        .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
            return response.json();
        });
};
