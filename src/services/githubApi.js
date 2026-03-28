/* GitHub REST API Interactions */
import axios from "axios"

// base URL (v3) of GitHub REST API
const BASE_URL = "https://api.github.com";

// Pre-configured axios instance with shared-default (headers for now)
const githubClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
});

/* 
Search Repositories 
Fetch repos matching search query
    - query (string)
    - perPage (number)
    - AbortSignal (signal)
    - Promise<array> (array of repo objects)
*/
export const searchRepositories = async ( query, perPage=10, signal=null) => {
    const response = await githubClient.get("/search/repositories", {
        params: {
            q: query,
            per_page: perPage,
            sort: "stars",
            order: "desc"
        },

        // Race condition tackle - AbortController signal axios
        signal,
    });

    // return the response data items
    return response.data.items;
}

/*
Fetch trending repositories:
 - stars more than 50k
 - 4 per_page
 - desc order
*/
export const fetchTrendingRepositories = async (signal=null) => {
    const response = await githubClient.get("/search/repositories", {
        params: {
            q: "stars:>50000",
            per_page: 4,
            sort: "stars",
            order: "desc",
        },
        signal,
    });

    // return response data items
    return response.data.items;
}

