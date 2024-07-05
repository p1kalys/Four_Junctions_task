import { Request, Response } from "express"

import {
  getUserByNumber,
  createUser,
} from "../db/repositories/user.respository"
import bcrypt from "bcrypt"
import { generateToken, verifyToken } from "../helpers/auth.helper"

export const login = async (req: Request, res: Response) => {
  try {
    const { number, password } = req.body

    if (!number || !password) {
      return res.sendStatus(400)
    }

    const user = await getUserByNumber(number).select("+password")
    if (!user) {
      console.log("user not found")
      return res.sendStatus(400)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.sendStatus(403)
    }

    const { token } = await generateToken(user)

    res.cookie("Authorization", token, {
      domain: "localhost",
      path: "/",
    })

    return res
      .status(200)
      .json({
        user: {
          id: user.id,
          name: user.name,
          number: number,
        },
        token: token,
      })
      .end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const { name, number, password } = req.body
    if (!name || !number || !password) {
      return res.sendStatus(400)
    }

    const existingUser = await getUserByNumber(number)

    if (existingUser) {
      return res.sendStatus(400)
    }

    const newUser = await createUser({
      name,
      number,
      password: password,
    })

    if (!newUser) {
      return res.status(400).json({ message: "Failed to create user" }).end()
    }

    return res.status(200).json({ message: "SUCCESS" }).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const authentication = async (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" })
  }

  const [bearer, token] = authHeader.split(" ")
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Invalid authorization header format" })
  }

  try {
    // Verify the token
    verifyToken(token)
    res.send("Authentication successful")
  } catch (error) {
    // If token verification fails, return an error response
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}
