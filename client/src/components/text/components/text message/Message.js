import React, { memo } from "react"
import Seen from "../../../svg/Seen"

const Message = ({ item, notification_count, email_id, num }) => {
  return (
    <div className={item.chats_from === email_id ? "text-user" : "text-other"}>
      {item.text_info}
      <div style={{ display: "inline-block", marginTop: "0.2rem" }}>
        <span className='text-time-span'>{item.time}</span>
        {item.chats_from === email_id ? (
          <Seen color={notification_count <= num ? "darkgray" : "#34B7F1"} />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default memo(Message)
