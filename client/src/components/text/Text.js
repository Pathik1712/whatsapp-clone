import React, { useEffect, useRef, useState } from "react"
import Textmain from "./components/Textmain"
import Textheader from "./components/Textheader"
import axios from "axios"
import { useLocation } from "react-router-dom"
import "./text.css"
import { useDispatch, useSelector } from "react-redux"
import Imagesvg from "../svg/Imagesvg.js"
import Send from "../svg/Send"
import Share from "../svg/Share"
import { message, selectchats } from "../../data/slice/user_data.js"
import { findUserdetails } from "../../func/find_chats.js"
import { useUpdate } from "./func/update.js"
import socket from "../../func/socket"
import useType from "./func/type.js"

const Text = () => {
  const payload = useLocation().state,
    dispatch = useDispatch(),
    select_text = useSelector((state) => selectchats(state, payload.id)),
    find_user = useRef(findUserdetails(payload.email_id, select_text)),
    [file, set_file] = useState(null),
    [load, set_load] = useState(false),
    [typing, set_typing] = useState(false),
    [status, set_status] = useState(false),
    [emit_con, set_emit_con] = useState(false)
  const input_ref = useRef()

  // ! typing

  useType(find_user.current, payload.email_id)

  //  ! recive msg
  useUpdate(select_text, payload.id, payload.u_id, payload.email_id)

  // ! event listener

  useEffect(() => {
    let elm = document.getElementsByClassName("text-area")[0]
    const scroll = () => {
      input_ref.current.setAttribute("rows", "1")
      let val =
        input_ref.current.scrollHeight < 161
          ? input_ref.current.scrollHeight / 32
          : 5
      input_ref.current.setAttribute("rows", val.toString())
    }
    input_ref.current.addEventListener("input", scroll)

    const socket_fun = (data) => {
      set_typing(data)
    }
    socket.on("typing_rcv", socket_fun)

    const status_fun = (data) => {
      if (typing && !data) {
        set_typing(false)
      }
      set_status(data)
    }
    socket.on("status", status_fun)
    return () => {
      elm.removeEventListener("input", scroll)

      socket.off("typing_rcv", socket_fun)
      socket.off("status", status_fun)
      socket.emit("typing", false, find_user.current.user_details.email_id)
    }
  }, [])

  // ! send msg
  useEffect(() => {
    let moun = true
    if (load === true) {
      const func = async () => {
        let date = new Date()
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()}pm`
            : `${date.getHours()}:${date.getMinutes()}am`
        let chats_obj = {
          chats_from: payload.email_id,
          text_info: input_ref.current.value,
          text_type: "msg",
          time,
        }
        if (input_ref.current.value === "" && !file) {
          input_ref.current.focus()
        } else if (file) {
          let read = new Blob([file])
          try {
            let res = await axios.put(
              process.env.REACT_APP_URL + "msg/file",
              {
                read,
                room: find_user.current.user_details.email_id,
                chat_obj: {
                  ...chats_obj,
                  text_type: file.type,
                },
                id: payload.id,
                u_id: payload.u_id,
              },
              { headers: { "Content-Type": "multipart/form-data" } }
            )
            if (res.data) {
              dispatch(
                message({
                  ...chats_obj,
                  text_type: file.type,
                  id: payload.id,
                })
              )
            } else {
              if (moun) {
                const elm = document.getElementsByClassName(
                  "text-offline-warning"
                )[0]
                if (elm.classList.contains("warn-anm")) {
                  elm.classList.remove("warn-anm")
                  void elm.offsetWidth
                }
                elm.classList.add("warn-anm")
              }
            }
            set_file(null)
            document.getElementById("text-file-input").value = null
          } catch {}
        } else {
          await axios.put(process.env.REACT_APP_URL + "msg/msg", {
            room: find_user.current.user_details.email_id,
            chat_obj: {
              ...chats_obj,
            },
            id: payload.id,
            u_id: payload.u_id,
          })
          dispatch(message({ ...chats_obj, id: payload.id }))
        }
        set_load(false)
        if (status) {
          socket.emit("typing", false, find_user.current.user_details.email_id)
          set_emit_con(false)
        }
        input_ref.current.value = ""
        input_ref.current.focus()
        input_ref.current.setAttribute("rows", "1")
      }
      func()
    }
    return () => {
      moun = false
    }
  }, [load])

  return (
    <div className='text-bg'>
      <section className='text-body'>
        <Textheader
          find_user={find_user}
          status={status}
        />
        <Textmain
          select_text={select_text}
          email_id={payload.email_id}
          load={load}
          typing={typing}
        />
        <footer className='text-footer'>
          <label
            className='text_btn'
            htmlFor='text-file-input'
          >
            <input
              id='text-file-input'
              type='file'
              disabled={load}
              multiple={false}
              onChange={(e) => {
                let temp = e.target.files[0]
                set_file(temp)
              }}
            />
            <button
              onClick={() => {
                set_file(null)
                document.getElementById("text-file-input").value = null
              }}
              className='text-input-btn'
              style={{
                left: file ? "10%" : "-200%",
                top: file ? "-100%" : "50%",
              }}
            >
              X
            </button>
            <p className='text-offline-warning '>User is offline</p>
            {file ? <Imagesvg /> : <Share />}
          </label>
          <textarea
            id='text-footer-input'
            rows={"1"}
            className='text-area'
            placeholder='Message'
            ref={input_ref}
            onChange={(e) => {
              if (status) {
                if (e.target.value !== "") {
                  if (!emit_con) {
                    socket.emit(
                      "typing",
                      true,
                      find_user.current.user_details.email_id
                    )
                    set_emit_con(true)
                  }
                } else {
                  socket.emit(
                    "typing",
                    false,
                    find_user.current.user_details.email_id
                  )
                  set_emit_con(false)
                }
              }
            }}
          ></textarea>
          <button
            disabled={load}
            className='text_btn'
            onClick={() => {
              set_load(true)
            }}
          >
            <Send />
          </button>
        </footer>
      </section>
    </div>
  )
}

export default Text
