import { MovieModel } from "../../models/movie.model"

export const getMovies = () => MovieModel.find()
export const createMovie = (values: Record<string, any>) =>
  new MovieModel(values).save().then((Movie) => Movie.toObject())
export const editMovierById = (id: string, values: Record<string, any>) =>
  MovieModel.findByIdAndUpdate(id, values)
