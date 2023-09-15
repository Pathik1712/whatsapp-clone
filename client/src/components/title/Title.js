import React from "react"
import Whatsapp from "../svg/Whatsapp_svg.js"
import "./title.css"
import More from "../svg/More.js"
import { useNavigate } from "react-router-dom"
import { remove_session } from "../../func/use_session.js"
import { useDispatch } from "react-redux"
import { logout } from "../../data/slice/user_data.js"

const Title = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className='home-title'>
      <div>
        <Whatsapp />
        <h1>WhatsApp</h1>
      </div>
      <button>
        <input
          id='more-inp'
          type='checkbox'
          style={{ display: "none" }}
        />
        <label htmlFor='more-inp'>
          <More />
        </label>
        <ul
          className='pop'
          htmlFor='more-inp'
        >
          <li
            onClick={() => {
              dispatch(logout())
              remove_session("email")
              remove_session("auth_token")
              navigate("/login")
            }}
          >
            Log Out
          </li>
        </ul>
      </button>
    </div>
  )
}

export default Title
