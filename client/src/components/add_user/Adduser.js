import React, { useEffect, useState } from "react"
import "./adduser.css"
import axios from "axios"
import Adduserlabel from "./Add_user_label"
import { user_data as ud } from "../../data/slice/user_data.js"
import { useSelector } from "react-redux"

const Adduser = () => {
  const user_data = useSelector(ud)
  const [take_input, set_input] = useState(""),
    [data, set_data] = useState(null)
  useEffect(() => {
    let controller = new AbortController()
    if (take_input !== "") {
      const handlesubmit = async () => {
        try {
          let res = await axios.post(
            "http://localhost:3500/home/adduser",
            { email_id: take_input },
            { signal: controller.signal }
          )
          set_data(res.data)
        } catch (err) {}
      }
      handlesubmit()
    }
    return () => {
      controller.abort()
    }
  }, [take_input])

  return (
    <main className='add-user-main'>
      <div className='add-user-input-div'>
        <input
          type='text'
          placeholder='search'
          className='add-user-input'
          onChange={(e) => {
            set_input(e.target.value)
          }}
        />
      </div>
      {data &&
        data.map((item, num) =>
          item.email_id !== user_data.email_id ? (
            <Adduserlabel
              key={`add-user-${num}`}
              item={item}
            />
          ) : (
            ""
          )
        )}
    </main>
  )
}

export default Adduser
