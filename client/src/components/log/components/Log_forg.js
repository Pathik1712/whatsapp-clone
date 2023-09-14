import React, { useEffect, useRef, useState } from "react"
import Loader from "../../loader/Loader.js"
import { set_session, get_session } from "../../../func/use_session.js"
import "../login.css"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import Email from "./input/Email.js"
import Whatsapp_svg from "../../svg/Whatsapp_svg.js"

const Log_forg = () => {
  const navigate = useNavigate()
  const [is_loading, set_is_loading] = useState(false)
  const [inp_pass, set_inp_pass] = useState(false)
  const [resend, set_resend] = useState(false)
  const [trigger, set_trigger] = useState(false)
  const [take_input, set_takeinput] = useState("")
  const [num, set_num] = useState()
  const [res, set_res] = useState(null)
  const [btn_txt, set_btn_txt] = useState("send otp")
  let state = useLocation().state
  let pass = useRef("")
  useEffect(() => {
    if (
      inp_pass &&
      take_input === pass.current.toString() &&
      take_input.length === 6
    ) {
      navigate("/login/signup", { state })
    } else if (
      take_input.length === 6 &&
      take_input !== pass.current.toString() &&
      inp_pass
    ) {
      set_res("Enter Valid Otp")
    } else if (inp_pass) {
      set_res(false)
    }
  }, [take_input])
  useEffect(() => {
    let count = 60
    set_num(60)
    const inter = setInterval(() => {
      set_num((num) => num - 1)
      count--
      if (count === 0) {
        if (inp_pass) {
          set_btn_txt("resend")
          set_resend(true)
        }
        clearInterval(inter)
      }
    }, 1000)
    return () => clearInterval(inter)
  }, [trigger])
  const handle_submit = async () => {
    let temp = ""
    for (let i = 0; i < 6; i++) {
      temp = temp + Math.floor(Math.random() * 10).toString()
    }
    pass.current = temp
    document.getElementsByClassName("log_btn")[0].style.fontSize = "0"
    set_is_loading(true)
    try {
      let result = await axios.post(process.env.REACT_APP_URL + "login/mail", {
        email: get_session("email"),
        pass: pass.current,
        state,
      })
      if (result.data) {
        set_res("user alredy exist")
        set_resend(false)
        set_is_loading(false)
        document.getElementsByClassName("log_btn")[0].style.fontSize = "1.4rem"
        return
      }
    } catch {
      set_res("some thing went wrong")
      set_resend(false)
      set_is_loading(false)
      document.getElementsByClassName("log_btn")[0].style.fontSize = "1.4rem"
      return
    }
    set_inp_pass(true)
    set_takeinput("")
    set_resend(false)
    set_trigger(!trigger)
    set_is_loading(false)
    document.getElementsByClassName("log_btn")[0].style.fontSize = "1.4rem"
    set_btn_txt("sent")
  }
  return (
    <main className='log_page'>
      <form
        className='log_form'
        style={{ justifyContent: "space-evenly" }}
        onSubmit={(e) => {
          e.preventDefault()
          set_res("")
          if (!inp_pass) {
            set_session("email", take_input)
          }
          handle_submit(e)
        }}
      >
        <div className='svg'>
          <Whatsapp_svg />
          <p>WHATSAPP</p>
          <p className='form_p'>keep connected</p>
        </div>
        {!inp_pass && (
          <Email
            set_takeinput={set_takeinput}
            take_input={take_input}
          />
        )}
        {inp_pass && (
          <div className='log_inp_div'>
            <div className='log_wrap'>
              <input
                type='text'
                inputMode='numeric'
                onChange={(e) => {
                  set_takeinput(e.target.value)
                }}
                value={take_input}
                className='log_inp'
                placeholder=' '
                id='pass'
              />
              <label htmlFor='pass'>Enter Otp</label>
            </div>
            <div className='log_symbol'>
              <svg
                viewBox='0 0 48 48'
                xmlns='http://www.w3.org/2000/svg'
                fill='#000000'
              >
                <g
                  id='SVGRepo_bgCarrier'
                  strokeWidth='0'
                ></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  {" "}
                  <g
                    id='Layer_2'
                    data-name='Layer 2'
                  >
                    {" "}
                    <g
                      id='invisible_box'
                      data-name='invisible box'
                    >
                      {" "}
                      <rect
                        width='48'
                        height='48'
                        fill='none'
                      ></rect>{" "}
                    </g>{" "}
                    <g
                      id='Layer_7'
                      data-name='Layer 7'
                    >
                      {" "}
                      <path d='M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM14,35a3,3,0,1,1,3-3A2.9,2.9,0,0,1,14,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,23,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,32,35Z'></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
          </div>
        )}
        <button
          className='log_btn'
          type='submit'
          disabled={!resend && inp_pass}
        >
          {is_loading && <Loader size={"1.4"} />}
          {btn_txt}
        </button>
        <div className='log_link_wraper'>
          {inp_pass && !resend && (
            <button className='log_link'>Resend otp in:{num}</button>
          )}
          {res && <p className='err_msg'>{res}</p>}
        </div>
      </form>
    </main>
  )
}

export default Log_forg
