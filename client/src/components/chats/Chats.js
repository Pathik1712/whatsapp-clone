import React from "react"
import "./chats.css"
import Chatslabel from "./Chats_label"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectallchats, user_data } from "../../data/slice/user_data.js"

const Chats = () => {
  const ud = useSelector(user_data)
  const allchats = useSelector(selectallchats)
  return (
    <main className='chats-main'>
      {!allchats.length && (
        <p className='chat_null'>you dont have any contact</p>
      )}
      {allchats &&
        allchats.map((item, num) => (
          <Link
            to={"/home/texts"}
            style={{ textDecoration: "none" }}
            key={`user-${num}`}
            state={{ email_id: ud.email_id, id: item._id, u_id: ud._id }}
          >
            <Chatslabel
              item={item}
              email_id={ud.email_id}
            />
          </Link>
        ))}
    </main>
  )
}

export default Chats
