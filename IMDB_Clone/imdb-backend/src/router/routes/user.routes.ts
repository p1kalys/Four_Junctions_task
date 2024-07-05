import { Router } from "express"

import {
  getAllUsers,
} from "../../controllers/user.controller"
// import { LOGGED_IN_USER } from "../../middlewares/auth.middleware"

export default (router: Router) => {
  router.post("/users", getAllUsers)
}
