import mongoose from "mongoose"

const chatschema = new mongoose.Schema({
  user_info: [
    {
      user_details: { type: mongoose.Schema.Types.ObjectId, ref: "user's" },
      notification: Number,
    },
  ],
  chat_type: String,
  chats: [
    {
      chats_from: { type: String, require: true },
      text_type: String,
      text_info: String,
      time: String,
    },
  ],
})

const chat_model = mongoose.model("chats", chatschema)
export default chat_model
