import React from "react"
import Profilesvg from "../svg/Profile_svg"

const Chats_label = ({ item, email_id }) => {
  let find_user = item.user_info.find(
    (i) => i.user_details.email_id !== email_id
  )
  let user = item.user_info.find((i) => i.user_details.email_id === email_id)
  let notification_count = item.chats.length - user.notification

  let chat_slogan = "",
    chat_len = item.chats.length
  if (chat_len !== 0) {
    let chat_obj = item.chats[chat_len - 1]
    chat_slogan =
      chat_obj.chats_from === email_id
        ? "you:"
        : find_user.user_details.username + ":"
    chat_slogan +=
      chat_obj.text_type === "msg"
        ? chat_obj.text_info
        : chat_obj.text_type.split("/")[0]
  } else {
    chat_slogan = find_user.user_details.slogan
  }
  return (
    <div className='chat_label'>
      <div className='chat_profile'>
        {find_user.user_details.hasOwnProperty("profile_pic") ? (
          <img
            src={find_user.user_details.profile_pic}
            alt='not'
          />
        ) : (
          <Profilesvg />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginLeft: "1.2rem",
          overflow: "hidden",
        }}
      >
        <p className='chat_title'>{find_user.user_details.username}</p>
        <p
          className='chat_slogan'
          style={{ letterSpacing: "0.3px", fontWeight: "bold" }}
        >
          {chat_slogan}
        </p>
      </div>

      {notification_count !== 0 && (
        <span className='chat_notification'>{notification_count}</span>
      )}
    </div>
  )
}

export default Chats_label
