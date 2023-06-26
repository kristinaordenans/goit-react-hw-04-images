import axios from "axios";

export class PixabayAPI {
    #BASE_URL = `https://pixabay.com/api/`;
    #API_KEY = '35192963-4124dd642b3fb461106fa319d';

    #BASE_PARAMS = {
        image_type: `photo`,
        orientation: `horizontal`,
        per_page: 12,
    }

    get perPage() {
        return this.#BASE_PARAMS.per_page;
    }

    q = null;
    page = 1;
    
    fetchPhotos() {
        return axios.get(`${this.#BASE_URL}?key=${this.#API_KEY}&`,{
            params: {
                q: this.q,
                ...this.#BASE_PARAMS,
                page: this.page,
        },
    });
    }
}