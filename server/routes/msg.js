import chatsModel from "../schema/chats_schema.js"
import expr from "express"
import multer from "multer"
import { io } from "../index.js"
import mongoose from "mongoose"

const router = expr.Router()
router.put("/file", multer().any(), async (req, res) => {
  const { room, chat_obj, id, u_id } = req.body
  const read = req.files[0]
  if (io.sockets.adapter.rooms.has(room)) {
    const elmid = new mongoose.Types.ObjectId(u_id)
    await chatsModel.findByIdAndUpdate(
      id,
      {
        $push: { chats: chat_obj },
        $inc: { "user_info.$[elm].notification": 1 },
      },
      { arrayFilters: [{ "elm.user_details": elmid }] }
    )

    io.to(room).emit("rcv_file", read, { ...chat_obj, id })
    res.send(true)
  } else {
    res.send(false)
  }
})
router.put("/msg", async (req, res) => {
  const { room, chat_obj, id, u_id } = req.body
  const elmid = new mongoose.Types.ObjectId(u_id)
  await chatsModel.findByIdAndUpdate(
    id,
    {
      $push: { chats: chat_obj },
      $inc: { "user_info.$[elm].notification": 1 },
    },
    { arrayFilters: [{ "elm.user_details": elmid }] }
  )
  io.to(room).emit("rcv", { ...chat_obj, id })
  res.send()
})
router.patch("/rcv", async (req, res) => {
  const { count, id, u_id, user, email } = req.body
  const find_id = new mongoose.Types.ObjectId(u_id)
  await chatsModel.findByIdAndUpdate(
    id,
    {
      $set: { "user_info.$[elm].notification": count },
    },
    {
      arrayFilters: [{ "elm.user_details": find_id }],
    }
  )
  io.to(user).emit("count update", count, email, id)
  res.send()
})
export { router as msg }
