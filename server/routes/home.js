import expr from "express"
import usermodel from "../schema/user_schema.js"
import chatsModel from "../schema/chats_schema.js"
import multer from "multer"
import cloud from "../func/cloud.js"

let router = expr.Router()

router.post("/user", async (req, res) => {
  const { email } = req.body
  let user = await usermodel.findOne({ email_id: email }).populate({
    path: "chats",
    populate: {
      path: "user_info.user_details",
      select: ["username", "profile_pic", "slogan", "email_id"],
    },
  })
  res.send(user)
})
router.post("/adduser", async (req, res) => {
  const { email_id } = req.body
  let user = await usermodel
    .find({
      email_id: { $regex: email_id },
    })
    .limit(10)
  res.send(user)
})
router.post("/addcontacts", async (req, res) => {
  const { item, id } = req.body
  let user = await usermodel.findById(id)
  user.contacts.push(item.email_id)
  let chatsmodel = await chatsModel.create({
    user_info: [
      { user_details: user._id, notification: 0 },
      {
        user_details: item._id,
        notification: 0,
      },
    ],
    chat_type: "solo",
    chats: [],
  })
  user.chats.push(chatsmodel._id)
  user.save()
  let second_user = await usermodel.findById(item._id)
  second_user.contacts.push(user.email_id)
  second_user.chats.push(chatsmodel._id)
  second_user.save()
  await chatsmodel.populate({
    path: "user_info.user_details",
    select: ["username", "profile_pic", "slogan", "email_id"],
  })
  res.send(chatsmodel)
})
router.patch("/profile", multer().any(), async (req, res) => {
  const { user_name, slogan, id } = req.body
  const files = req.files[0]
  const user = await usermodel.findById(id)
  try {
    if (files) {
      try {
        const url = await cloud.v2.uploader.upload(
          `data:${files.mimetype};base64,${Buffer.from(files.buffer).toString(
            "base64"
          )}`,
          {
            public_id: id,
          }
        )
        user.profile_pic = url.secure_url
      } catch (e) {
        console.log(e)
      }
    }
    user.username = user_name
    user.slogan = slogan
    await user.save()
    res.send()
  } catch {
    res.sendStatus(404)
  }
})
export { router as home }
