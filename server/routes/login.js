import express from "express"
import bcrypt from "bcryptjs"
import usermodel from "../schema/user_schema.js"
import { transport, mail_details } from "../func/verify.js"
import fs from "fs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/new_user", async (req, res) => {
  const { email, pass } = req.body
  const hash_pass = bcrypt.hashSync(pass, 10)
  try {
    const user = await usermodel.create({
      username: email,
      email_id: email,
      chats: [],
      password: hash_pass,
    })
    let token = jwt.sign({ email, pass, id: user._id }, process.env.JWT_SECRET)
    res.send({ state: true, token })
  } catch (err) {
    res.send({ state: false })
  }
})
router.post("/mail", async (req, res) => {
  const { email, pass, state } = req.body
  if (state === "signup") {
    let resp = await usermodel.findOne({ email_id: email })
    if (resp) {
      res.send(true)
    }
  }

  mail_details.to = email
  let data = fs.readFileSync("./mail.html", "utf-8")
  data = data.replace(`{{{inp}}}`, pass)
  mail_details.html = data
  await transport.sendMail(mail_details, (err, info) => {
    if (err) {
      res.send(true)
    } else {
      res.send(false)
    }
  })
})
router.post("/auth", async (req, res) => {
  const { email, pass } = req.body
  let find_email = await usermodel.findOne({ email_id: email })
  if (!find_email) {
    res.send({ state: false })
  } else {
    let match = await bcrypt.compare(pass, find_email.password)
    if (match) {
      let token = jwt.sign(
        { email, pass, id: find_email._id },
        process.env.JWT_SECRET
      )
      res.send({ state: true, token })
    } else {
      res.send({ state: false })
    }
  }
})
router.put("/forgot_password", async (req, res) => {
  const { pass, email } = req.body
  try {
    const hash_pass = await bcrypt.hash(pass, 10)
    const user = await usermodel.findOneAndUpdate(
      { email_id: email },
      { password: hash_pass }
    )
    let token = jwt.sign({ email, pass }, process.env.JWT_SECRET)
    res.send({ state: true, token })
  } catch (e) {
    res.send({ state: false })
  }
})
export { router as login }
