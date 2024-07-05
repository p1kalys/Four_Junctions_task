import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../helpers/auth.helper"

export const LOGGED_IN_USER = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["Authorization"]

    if (!accessToken) {
      return res.sendStatus(403)
    }

    if (!verifyToken(accessToken)) {
      return res.sendStatus(401)
    }

    return next()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
