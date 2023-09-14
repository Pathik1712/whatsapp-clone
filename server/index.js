import expr from "express"
import mongoose from "mongoose"
import http from "http"
import cors from "cors"
import dotenv from "dotenv/config.js"
import { Server as socketio } from "socket.io"
import { home } from "./routes/home.js"
import { login } from "./routes/login.js"
import { msg } from "./routes/msg.js"

let app = expr()
let server = http.createServer(app)
const io = new socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
})

app.use(cors())
app.use(expr.json())
app.use("/login", login)
app.use("/home", home)
app.use("/msg", msg)

mongoose.connect(process.env.CONNECT_STRING)

app.get("/", (req, res) => {
  res.send("hiiiii")
})

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data)
  })
  socket.on("typing", (msg, user) => {
    io.to(user).emit("typing_rcv", msg)
  })
  socket.on("exist", (data, user) => {
    const temp = io.sockets.adapter.rooms.has(data)
    io.to(user).emit("status", temp)
  })
})

server.listen(process.env.PORT, () => {
  console.log("connected", process.env.CONNECT_STRING, process.env.PORT)
})

export { io }
