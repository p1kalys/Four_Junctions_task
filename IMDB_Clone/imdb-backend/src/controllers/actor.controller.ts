import { Request, Response } from "express"

import { getActors, createActor } from "../db/repositories/actor.repository"

export const getAllActors = async (req: Request, res: Response) => {
  try {
    const Actors = await getActors()
    return res.status(200).json(Actors)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const insertActor = async (req: Request, res: Response) => {
  try {
    const newActor = await createActor(req.body)
    res.status(201).json(newActor)
  } catch (error) {
    console.error("Error creating booking:", error)
    res.status(500).json({ message: "Failed to create booking." })
  }
}
