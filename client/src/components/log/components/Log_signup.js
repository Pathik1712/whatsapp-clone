import React, { useEffect, useState } from "react"
import Loader from "../../loader/Loader.js"
import "../login.css"
import Whatsapp_svg from "../../svg/Whatsapp_svg.js"
import Password from "./input/Password.js"
import { get_session, set_session } from "../../../func/use_session.js"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

const Log_signup = () => {
  const navigate = useNavigate()
  let state = useLocation().state
  const [is_loading, set_is_loading] = useState(false)
  const [take_pass, set_take_pass] = useState("")
  const [take_confirm_pass, set_take_confirm_pass] = useState("")
  const [err_msg, set_err_msg] = useState(null)
  const [trigger, set_trigger] = useState(false)

  useEffect(() => {
    let mount = true
    let source = axios.CancelToken.source()
    if (trigger) {
      const fun = async () => {
        document.getElementsByClassName("log_btn")[0].style.fontSize = "0"
        set_is_loading(true)
        try {
          let response
          if (state !== "forgot") {
            response = await axios.post(
              process.env.REACT_APP_URL + "login/new_user",
              {
                email: get_session("email"),
                pass: take_pass,
              },
              { cancelToken: source.token }
            )
          } else {
            response = await axios.put(
              process.env.REACT_APP_URL + "login/forgot_password",
              {
                email: get_session("email"),
                pass: take_pass,
              },
              { cancelToken: source.token }
            )
          }
          if (!response.data.state) {
            throw new Error("server not working")
          }
          set_session("auth_token", response.data.token)
          navigate("/home/chats")
        } catch (err) {
          set_err_msg(err.message)
        } finally {
          set_is_loading(false)
          if (mount) {
            document.getElementsByClassName("log_btn")[0].style.fontSize =
              "1.4rem"
          }
          set_trigger(false)
        }
      }
      fun()
    }
    return () => {
      source.cancel("canceled")
      mount = false
    }
  }, [trigger])
  return (
    <main className='log_page noselect'>
      <form
        className='log_form'
        onSubmit={(e) => {
          e.preventDefault()
          set_err_msg("")
          if (take_pass !== take_confirm_pass) {
            set_err_msg("password does not match")
          } else {
            set_trigger(true)
          }
        }}
      >
        <div className='svg'>
          <Whatsapp_svg />
          <p>WHATSAPP</p>
          <p className='form_p'>keep connected</p>
        </div>
        <Password
          take_pass={take_pass}
          set_take_pass={set_take_pass}
          label={"Enter New Password"}
          id={"sign_up_1"}
          key={"sign_up_1"}
        />

        <Password
          key={"sign_up_2"}
          take_pass={take_confirm_pass}
          set_take_pass={set_take_confirm_pass}
          label={"Confirm New Password"}
        />
        <button
          className='log_btn'
          type='submit'
        >
          {is_loading && <Loader size={"1.4"} />}
          register
        </button>
        {err_msg && <p className='err_msg'>{err_msg}</p>}
      </form>
    </main>
  )
}

export default Log_signup
