import { Router } from "express"
import authentication from "./routes/authentication.routes"
import users from "./routes/user.routes"
import actors from "./routes/actor.routes"
import producers from "./routes/producer.routes"
import movie from "./routes/movie.routes"

const router = Router()

export default (): Router => {
  authentication(router)
  users(router)
  actors(router)
  producers(router)
  movie(router)
  return router
}
