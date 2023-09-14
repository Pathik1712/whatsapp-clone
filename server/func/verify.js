import mail from "nodemailer"

let transport = mail.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pathikchauhan17@gmail.com",
    pass: process.env.MAIL_PASS,
  },
})

let mail_details = {
  from: "pathikchauhan17@gmail.com",
  to: "",
  subject: "OTP MAIL",
  html: "",
}
export { mail_details, transport }
