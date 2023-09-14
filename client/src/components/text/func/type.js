import { useEffect } from "react"
import socket from "../../../func/socket"

const useType = (data, user_id) => {
  useEffect(() => {
    const type_interval = setInterval(() => {
      socket.emit("exist", data.user_details.email_id, user_id)
    }, 5000)
    return () => {
      clearInterval(type_interval)
    }
  }, [data.user_details.email_id, user_id])
}

export default useType
