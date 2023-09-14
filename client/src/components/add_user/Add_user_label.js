import React, { useEffect, useState } from "react"
import Profile from "../svg/Profile_svg"
import { user_data as ud, user_add } from "../../data/slice/user_data.js"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Loader from "../loader/Loader.js"

const Add_user_label = ({ item }) => {
  const user_data = useSelector(ud),
    [trigger, set_trigger] = useState(false),
    dispatch = useDispatch()
  const btn = user_data.contacts.find((i) => i === item.email_id)
  useEffect(() => {
    let controller = new AbortController()
    if (trigger) {
      const fun = async () => {
        try {
          let res = await axios.post(
            process.env.REACT_APP_URL + `home/addcontacts`,
            { item, id: user_data._id },
            { signal: controller.signal }
          )
          dispatch(user_add({ chats_obj: res.data, email: item.email_id }))
          set_trigger(false)
        } catch {}
      }
      fun()
    }
    return () => controller.abort()
  }, [trigger])

  return (
    <section className='add-user-label'>
      <div className='add-user-profile'>
        {item.hasOwnProperty("profile_pic") ? (
          <img
            src={item.profile_pic}
            alt=''
          />
        ) : (
          <Profile />
        )}
      </div>
      <div className='add-user-text-div'>
        <p className='add-user-title'>{item.username}</p>
        <p className='add-user-slogan'>{item.slogan}</p>
      </div>
      <button
        className='add-user-btn'
        onClick={(e) => {
          set_trigger(true)
        }}
        disabled={!trigger && btn !== undefined}
      >
        {!trigger && (btn === undefined ? "add +" : "added")}
        {trigger && <Loader size={0.8} />}
      </button>
    </section>
  )
}

export default Add_user_label
