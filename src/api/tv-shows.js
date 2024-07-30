import axios from 'axios'
import {BASE_URL} from "../config.js";

export default class TvShowsAPI {
    static API_KEY = import.meta.env.VITE_API_KEY
    static async fetchPopulars() {
        const response = await axios.get(`${BASE_URL}tv/popular?api_key=${import.meta.env.VITE_API_KEY}`)
        return response.data.results
    }
    
    static async fetchRecommendations(tvShowId) {
        const response = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations?api_key=${import.meta.env.VITE_API_KEY}`)
        return response.data.results
    }

    static async fetchByTitle(title) {
        const response = await axios.get(`${BASE_URL}search/tv?api_key=${import.meta.env.VITE_API_KEY}&query=${title}`)
        return response.data.results
    }
}