export const getPictures = (search, page) => {
    const BASE_URL = 'https://pixabay.com/api/';
    const params = new URLSearchParams({
        q: search,
        key: process.env.API_KEY,
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
