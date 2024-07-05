import http from "../Utils/http-common"
import {
  EDIT_MOVIES_ENDPOINT,
  INSERT_MOVIE_ENDPOINT,
  MOVIES_BY_USERID_ENDPOINT,
} from "../constants/strings"
import { Movie, MovieResponse } from "../types/movie"

class MovieService {
  getAllMovies() {
    return http.get<Array<MovieResponse>>(MOVIES_BY_USERID_ENDPOINT)
  }
  insertMovie(movie: Movie) {
    return http.post<MovieResponse>(INSERT_MOVIE_ENDPOINT, movie)
  }
  editMovie(movieResponse: MovieResponse) {
    return http.post<MovieResponse>(EDIT_MOVIES_ENDPOINT, movieResponse)
  }
}

const movieService = new MovieService();

export default movieService;