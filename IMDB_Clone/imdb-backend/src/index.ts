import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import moment from "moment-timezone"

import router from "./router/createRouter"
import mongoose from "mongoose"

const app = express()

app.use(
  cors({
    credentials: true,
  })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8081, () => {
  console.log("Server running on http://localhost:8081/")
})

const MONGO_URL =
  "mongodb+srv://gibsongaleo:3nyKYp0fpyyB3GE4@cluster0.zfxlih3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.set('strictQuery', true);
mongoose.connection.on("error", (error: Error) => console.log(error))

app.use("/", router())

moment.tz.setDefault("Asia/Kolkata");