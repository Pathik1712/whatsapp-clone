import mongoose from "mongoose"

const userschema = new mongoose.Schema({
  username: { type: String, require: true },
  slogan: { type: String, default: "Keep Working" },
  password: { type: String, require: true },
  profile_pic: { type: String },
  email_id: { type: String, require: true },
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "chats" }],
  contacts: [{ type: String }],
})

const usermodel = mongoose.model(`user's`, userschema)

export default usermodel
