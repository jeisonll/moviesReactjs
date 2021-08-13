import {get, post, put, deleteRequest} from "../Network";


export function getMoviesService() {
    return get("/movies");
}

export function getByIdService(movie) {
    return post("/movie/" + movie)
}

export function putMoviesService(movie) {
    return put("/movies", movie);

}
export function postMovieService(movie) {
    return post("/movies", movie);
}
export function deleteMovieService(movie) {
    return deleteRequest("/movie/"+ movie);
}