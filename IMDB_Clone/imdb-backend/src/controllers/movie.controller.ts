import { Request, Response } from "express"

import {
  getMovies,
  createMovie,
  editMovierById,
} from "../db/repositories/movie.repository"

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getMovies()
    return res.status(200).json(movies)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getAllMoviesByUserId = async (req: Request, res: Response) => {
  try {
    const movies = await getMovies()
    return res.status(200).json(movies)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const insertMovie = async (req: Request, res: Response) => {
  try {
    const newMovie = await createMovie(req.body)
    res.status(201).json(newMovie)
  } catch (error) {
    console.error("Error creating Movie:", error)
    res.status(500).json({ message: "Failed to create movie." })
  }
}

export const editMovie = async (req: Request, res: Response) => {
  try {
    let { _id, ...movieData } = req.body
    const updatedMovie = await editMovierById(_id, movieData)
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" })
    }
    return res.status(200).json(req.body)
  } catch (error) {
    console.error("Error updating Movie:", error)
    return res.status(500).json({ message: "Failed to update movie." })
  }
}
