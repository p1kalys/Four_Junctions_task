import { createSlice } from "@reduxjs/toolkit"
import { MovieResponse } from "../../types/movie"

export interface MoviesState {
  movies: Array<MovieResponse> | null
}

export const initialState: MoviesState = {
  movies: null,
}

export const movieSlice = createSlice({
  initialState,
  name: "movies",
  reducers: {
    addAllMovies: (state, action) => {
      state.movies = action.payload
    },
    addOneMovie: (state, action) => {
      state.movies = state.movies
        ? [...state.movies, action.payload]
        : [action.payload]
    },
    updateMovie: (state, action) => {
      const updatedMovie = action.payload
      if (state.movies) {
        const index = state.movies.findIndex(
          (movie) => movie._id === updatedMovie._id
        )
        if (index !== -1) {
          state.movies = [
            ...state.movies.slice(0, index),
            updatedMovie,
            ...state.movies.slice(index + 1),
          ]
        }
      }
    },
  },
})

export const { addAllMovies, addOneMovie, updateMovie } = movieSlice.actions
export default movieSlice.reducer
