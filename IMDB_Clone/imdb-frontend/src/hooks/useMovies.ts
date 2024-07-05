import { useState, useEffect } from "react"
import movieService from "../services/movie.services"
import { Movie, MovieResponse } from "../types/movie"
import { AxiosResponse } from "axios"
import { useAppDispatch, useAppSelector } from "./useRedux"
import { addAllMovies, addOneMovie } from "../store/slice/movieSlice"

const useMovie = () => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [newMovie, setNewMovie] = useState<MovieResponse | null>(null)
  const moviesArr = useAppSelector((state) => state.movieSlice).movies
  const dispatch = useAppDispatch()

  const insertMovie = (movie: Movie) => {
    setMovie(movie)
  }

  useEffect(() => {
    const fetchAllMovies = async () => {
      if (moviesArr == null) {
        await movieService.getAllMovies()
          .then((response: AxiosResponse<Array<MovieResponse>>) => {
            const movieResponse: Array<MovieResponse> = response.data
            dispatch(addAllMovies(movieResponse))
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }
    const insertMovie = async () => {
      if (movie) {
        await movieService.insertMovie(movie)
          .then((response: AxiosResponse<MovieResponse>) => {
            const movieResponse: MovieResponse = response.data
            dispatch(addOneMovie(movieResponse))
            setNewMovie(movieResponse)
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }

    fetchAllMovies()
    insertMovie()
  }, [movie])

  return { newMovie, moviesArr, insertMovie }
}

export default useMovie
