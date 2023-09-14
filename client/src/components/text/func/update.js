import axios from "axios"
import { useEffect, useMemo, useRef } from "react"
import { update_notification } from "../../../data/slice/user_data.js"
import { useDispatch } from "react-redux"

export const useUpdate = (data, id, u_id, email) => {
  const dispatch = useDispatch()
  const last_data = useRef(0)
  let user = useMemo(() => {
    return data.user_info.find((i) => i.user_details.email_id === email)
  }, [data.user_info, email])
  const notification = data.chats.length - user.notification
  useEffect(() => {
    let count = data.chats.length
    const fun = async () => {
      dispatch(update_notification({ email, count, id }))
      last_data.current = count
      try {
        if (data.chats[count - 1].chats_from !== email) {
          await axios.patch(process.env.REACT_APP_URL + "msg/rcv", {
            count,
            id,
            u_id,
            user: data.chats[count - 1].chats_from,
            email,
          })
        }
      } catch {}
    }
    if (last_data.current !== count && notification !== 0) {
      fun()
    }
  }, [data])
}
