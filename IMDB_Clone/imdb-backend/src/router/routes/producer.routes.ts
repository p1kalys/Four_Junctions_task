import { Router } from "express"

import { getAllProducers, insertProducer } from "../../controllers/producer.controller"

export default (router: Router) => {
  router.get("/producer/all", getAllProducers)
  router.post("/producer/insert", insertProducer)
}
