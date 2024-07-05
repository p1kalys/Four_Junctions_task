import { Request, Response } from "express"

import { getProducers, createProducer } from "../db/repositories/producer.repository"

export const getAllProducers = async (req: Request, res: Response) => {
  try {
    const Producers = await getProducers()
    return res.status(200).json(Producers)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const insertProducer = async (req: Request, res: Response) => {
  try {
    const newProducer = await createProducer(req.body)
    res.status(201).json(newProducer)
  } catch (error) {
    console.error("Error creating booking:", error)
    res.status(500).json({ message: "Failed to create booking." })
  }
}
