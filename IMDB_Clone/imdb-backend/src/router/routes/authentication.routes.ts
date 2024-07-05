import { Router } from "express"
import {
  login,
  register,
  authentication,
} from "../../controllers/auth.controller"

export default (router: Router) => {
  router.post("/authenticate", authentication)
  router.post("/auth/register", register)
  router.post("/auth/login", login)
}
