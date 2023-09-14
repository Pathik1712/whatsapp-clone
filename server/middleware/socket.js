import { io } from "../index.js"

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    socket.join(data)
  })
  socket.on("msg", (room, data) => {
    socket.to(room).emit("rcv", data)
  })
  socket.on("exist", (room) => {
    console.log(io.sockets.adapter.rooms.has(room))
  })
  socket.on("file", async (data, room, details) => {
    socket.to(room).emit("rcv_file", data, details)
  })
})
