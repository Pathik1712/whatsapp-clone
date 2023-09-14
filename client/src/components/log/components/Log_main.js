import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import Loader from "../../loader/Loader.js"
import "../login.css"
import { Link, useNavigate } from "react-router-dom"
import Email from "./input/Email.js"
import Password from "./input/Password.js"
import { set_session } from "../../../func/use_session.js"
import WhatsappSvg from "../../svg/Whatsapp_svg.js"

const Log_main = () => {
  const navigate = useNavigate(),
    ref_btn = useRef()
  const [is_loading, set_is_loading] = useState(false),
    [take_input, set_takeinput] = useState(""),
    [take_pass, set_take_pass] = useState(""),
    [err, set_err] = useState(""),
    [trigger, set_trigger] = useState(false)

  useEffect(() => {
    let controller = new AbortController()
    let mount = true
    if (trigger) {
      const fun = async () => {
        ref_btn.current.style.fontSize = "0"
        set_is_loading(true)
        try {
          let res = await axios.post(
            process.env.REACT_APP_URL + "login/auth",
            { email: take_input, pass: take_pass },
            {
              signal: controller.signal,
              headers: {
                Origin: "http://localhost:3000",
              },
            }
          )
          if (!res.data.state) {
            set_err("invalid email or password")
          } else {
            set_session("auth_token", res.data.token)
            navigate("/home/chats")
          }
        } catch (err) {
          set_err("server not reponding")
        } finally {
          set_is_loading(false)
          if (mount) {
            ref_btn.current.style.fontSize = "1.4rem"
          }
          set_trigger(false)
        }
      }
      fun()
    }
    return () => {
      mount = false
      controller.abort()
    }
  }, [trigger, navigate, take_input, take_pass])

  return (
    <main className='log_page'>
      <form
        className='log_form'
        onSubmit={(e) => {
          e.preventDefault()
          set_err("")
          set_session("email", take_input)
          set_trigger(true)
        }}
      >
        <div className='svg'>
          <WhatsappSvg />
          <p>WHATSAPP</p>
          <p className='form_p'>keep connected</p>
        </div>
        <Email
          set_takeinput={set_takeinput}
          take_input={take_input}
        />
        <Password
          take_pass={take_pass}
          set_take_pass={set_take_pass}
          label={"Enter Your Password"}
        />
        <button
          className='log_btn'
          type='submit'
          ref={ref_btn}
          disabled={is_loading}
        >
          {is_loading && <Loader size={"1.4"} />}
          login
        </button>
        <div className='log_link_wraper'>
          <Link
            to={"/login/forgotpassword"}
            state={"forgot"}
          >
            <button className='log_link'>
              forgot
              <span style={{ color: "crimson" }}>password?</span>
            </button>
          </Link>
          <Link
            to={"/login/forgotpassword"}
            state={"signup"}
          >
            <button className='log_link'>
              didn't have account
              <span>sign up?</span>
            </button>
          </Link>
          {err && <p className='err_msg'>{err}</p>}
        </div>
      </form>
    </main>
  )
}

export default Log_main
