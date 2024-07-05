import { Router } from "express"

import { getAllActors, insertActor } from "../../controllers/actor.controller"

export default (router: Router) => {
  router.get("/actor/all", getAllActors)
  router.post("/actor/insert", insertActor)
}
