import React, { useEffect } from "react"
import "./home.css"
import Nav from "../navbar/Nav"
import Text from "../text/Text"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Chats from "../chats/Chats.js"
import Loading from "./components/Loading"
import Title from "../title/Title"
import Profile from "../profile/Profile"
import { useDispatch, useSelector } from "react-redux"
import {
  fetch_data,
  user_status,
  user_data as ud,
  message,
  update_notification,
} from "../../data/slice/user_data.js"
import Adduser from "../add_user/Adduser"
import socket from "../../func/socket"

const Home = () => {
  const status = useSelector(user_status),
    loc = useLocation()
  const user_data = useSelector(ud)
  const dispatch = useDispatch()
  useEffect(() => {
    if (status === "ideal") {
      dispatch(fetch_data())
    }
  }, [status, dispatch])

  useEffect(() => {
    if (status === "success") {
      socket.connect()
      socket.on("connect", () => {
        socket.emit("join", user_data.email_id)
      })
    }
  }, [status, user_data.email_id])

  useEffect(() => {
    const func = (payload) => {
      dispatch(message(payload))
    }
    const func1 = (data, payload) => {
      const blob = new Blob([data.buffer])
      const blobUrl = URL.createObjectURL(blob)
      dispatch(message({ ...payload, src: blobUrl }))
    }
    const count_update = (count, email, id) => {
      dispatch(update_notification({ count, email, id }))
    }

    socket.on("rcv", func)
    socket.on("rcv_file", func1)
    socket.on("count update", count_update)
    return () => {
      socket.off("rcv", func)
      socket.off("rcv_file", func1)
      socket.off("count update", count_update)
    }
  }, [dispatch])
  return (
    <main className='home noselect'>
      {status === "success" && loc.pathname !== "/home/texts" && (
        <section className='home-main-section'>
          <Title />
          <Routes>
            <Route
              path='/chats'
              element={<Chats />}
            />
            <Route
              path='/add'
              element={<Adduser />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
          </Routes>
          <Nav />
        </section>
      )}
      {status === "success" && loc.pathname === "/home/texts" && (
        <Routes>
          <Route
            path='/texts'
            element={<Text />}
          />
        </Routes>
      )}
      {status === "loading" && <Loading />}
      {status === "failed" && <Navigate to={"*"} />}
    </main>
  )
}

export default Home
