import { useState, useEffect } from "react"
import movieService from "../services/movie.services"
import { MovieResponse } from "../types/movie"
import { AxiosResponse } from "axios"
import { useAppDispatch, useAppSelector } from "./useRedux"
import { updateMovie } from "../store/slice/movieSlice"

const useEditMovie = () => {
  const [newMovie, setNewMovie] = useState<MovieResponse | null>(null)
  const moviesArr = useAppSelector((state) => state.movieSlice).movies
  const dispatch = useAppDispatch()

  const editMovie = (movieResponse: MovieResponse) => {
    movieService.editMovie(movieResponse)
      .then((response: AxiosResponse<MovieResponse>) => {
        const movieResponse: MovieResponse = response.data
        dispatch(updateMovie(movieResponse))
        setNewMovie(movieResponse)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  return { newMovie, moviesArr, editMovie }
}

export default useEditMovie
