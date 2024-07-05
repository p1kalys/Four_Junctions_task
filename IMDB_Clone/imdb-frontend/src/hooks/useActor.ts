import { useState, useEffect } from "react"
import actorService from "../services/actor.services"
import { Actor, ActorResponse } from "../types/actor"
import { AxiosResponse } from "axios"
import { useAppDispatch, useAppSelector } from "./useRedux"
import { addAllActors, addOneActor } from "../store/slice/actorSlice"

const useActor = () => {
  const [actor, setActor] = useState<Actor | null>(null)
  const [newActor, setNewActor] = useState<ActorResponse | null>(null)
  const actorsArr = useAppSelector((state) => state.actorSlice).actors
  const dispatch = useAppDispatch()

  const insertActor = (actor: Actor) => {
    setActor(actor)
  }

  useEffect(() => {
    const fetchAllActors = async () => {
      if (actorsArr == null) {
        await actorService.getAllActors()
          .then((response: AxiosResponse<Array<ActorResponse>>) => {
            const actorResponse: Array<ActorResponse> = response.data
            dispatch(addAllActors(actorResponse))
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }
    const insertActor = async () => {
      if (actor) {
        await actorService.insertActor(actor)
          .then((response: AxiosResponse<ActorResponse>) => {
            const actorResponse: ActorResponse = response.data
            dispatch(addOneActor(actorResponse))
            setNewActor(actorResponse)
          })
          .catch((e: Error) => {
            console.log(e)
          })
      }
    }

    fetchAllActors()
    insertActor()
  }, [actor])

  return { newActor, actorsArr, insertActor }
}

export default useActor
