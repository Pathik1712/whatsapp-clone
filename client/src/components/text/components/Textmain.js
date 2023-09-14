import React, { useEffect, useMemo, useRef } from "react"
import Message from "./text message/Message"
import Image from "./text message/Image"

const Textmain = ({ select_text, email_id, load, typing }) => {
  const scroll_ref = useRef(null)
  const notification_count = useMemo(() => {
    return select_text.user_info.find(
      (i) => i.user_details.email_id !== email_id
    ).notification
  }, [select_text])
  useEffect(() => {
    if (scroll_ref.current) {
      scroll_ref.current.scrollTop = scroll_ref.current.scrollHeight
    }
  }, [select_text, typing, load])

  return (
    <main
      className='text-main'
      ref={scroll_ref}
    >
      {select_text.chats.map((item, num) =>
        item.text_type !== "msg" ? (
          <Image
            key={`message-${num}`}
            item={item}
            email_id={email_id}
            notification_count={notification_count}
            num={num}
          />
        ) : (
          <Message
            key={`message-${num}`}
            item={item}
            email_id={email_id}
            notification_count={notification_count}
            num={num}
          />
        )
      )}
      {load && (
        <div className='load-user'>
          <span className='load-dot'></span>
          <span className='load-dot'></span>
          <span className='load-dot'></span>
        </div>
      )}
      {typing && (
        <div className='load-user load-other load-active'>
          <span className='load-dot'></span>
          <span className='load-dot'></span>
          <span className='load-dot'></span>
        </div>
      )}
    </main>
  )
}

export default Textmain
