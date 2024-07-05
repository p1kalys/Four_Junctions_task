import { Router } from "express"

import { editMovie, getAllMoviesByUserId, insertMovie } from "../../controllers/movie.controller"

export default (router: Router) => {
  router.get("/movie/all/", getAllMoviesByUserId)
  router.post("/movie/insert", insertMovie)
  router.post("/movie/edit/", editMovie)
}
