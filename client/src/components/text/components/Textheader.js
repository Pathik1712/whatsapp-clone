import React, { memo } from "react"
import Backsvg from "../../svg/Back_svg"
import Profile from "../../svg/Profile_svg.js"
import { Link } from "react-router-dom"

const Textheader = ({ find_user, status }) => {
  return (
    <header className='nav-header'>
      <Link to={"/home/chats"}>
        <Backsvg />
      </Link>
      {find_user.current.user_details.hasOwnProperty("profile_pic") ? (
        <img
          src={find_user.current.user_details.profile_pic}
          alt=''
        />
      ) : (
        <Profile />
      )}
      <div>
        <p>{find_user.current.user_details.username}</p>
        <span style={{ color: !status ? "darkgray" : "" }}>
          {status ? "online" : "offline"}
        </span>
      </div>
    </header>
  )
}

export default memo(Textheader)
