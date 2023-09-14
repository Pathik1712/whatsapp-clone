import React from "react"
import "./nav.css"
import { NavLink } from "react-router-dom"
import ChatsSvg from "../svg/Chats_svg"
import Adduser from "../svg/Add_user_svg.js"
const Nav = () => {
  return (
    <>
      <nav className='nav_main'>
        <div className='nav-icons'>
          <NavLink
            to={"/home/chats"}
            className={({ isActive }) =>
              isActive ? "active-icon" : "icon-text"
            }
          >
            <ChatsSvg />
          </NavLink>

          <NavLink
            to={"/home/add"}
            className={({ isActive }) =>
              isActive ? "active-icon" : "icon-text"
            }
          >
            <Adduser />
          </NavLink>

          <NavLink
            to={"/home/profile"}
            className={({ isActive }) =>
              isActive ? "active-icon" : "icon-text"
            }
          >
            Profile
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default Nav
