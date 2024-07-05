import { Router } from "express"

import { getAllActors, insertActor } from "../../controllers/actor.controller"

export default (router: Router) => {
  router.post("/actor/all", getAllActors)
  router.post("/actor/insert", insertActor)
}
