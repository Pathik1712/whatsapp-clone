import React, { useEffect, useRef, useState } from "react"
import "./profile.css"
import Loader from "../loader/Loader.js"
import Profilesvg from "../svg/Profile_svg"
import Chatsvg from "../svg/Chats_svg"
import { user_data as ud } from "../../data/slice/user_data.js"
import { useSelector } from "react-redux"
import axios from "axios"

const Profile = () => {
  const user_data = useSelector(ud),
    [image_src, set_image_src] = useState(
      user_data.hasOwnProperty("profile_pic") ? user_data.profile_pic : null
    ),
    [trigger, set_trigger] = useState(false)
  const user_name = useRef(null),
    slogan = useRef(null),
    files = useRef(null)
  useEffect(() => {
    const controller = new AbortController()
    let timeout,
      unmount = true
    if (trigger) {
      const func = async () => {
        let res = true
        const obj = new FormData()
        obj.append("files", files.current)
        obj.append("user_name", user_name.current.value)
        obj.append("slogan", slogan.current.value)
        obj.append("id", user_data._id)
        try {
          await axios.patch("http://localhost:3500/home/profile", obj, {
            signal: controller.signal,
          })
        } catch (err) {
          if (unmount) {
            res = false
            let elm = document.getElementsByClassName("prof-err")[0]
            if (elm.classList.contains("err-anm")) {
              elm.classList.remove("err-anm")
              void elm.offsetWidth
            }
            elm.classList.add("err-anm")
          }
        } finally {
          set_trigger(false)
          if (res) {
            window.location.reload()
          }
        }
      }
      func()
    }
    return () => {
      controller.abort()
      clearTimeout(timeout)
      unmount = false
    }
  }, [trigger, user_data._id])
  return (
    <form
      className='prof-main'
      onSubmit={(e) => {
        e.preventDefault()
        set_trigger(true)
      }}
    >
      <div className='prof-img'>
        {image_src ? (
          <img
            src={image_src}
            onLoad={() => {
              URL.revokeObjectURL(image_src)
            }}
            alt='not'
          />
        ) : (
          <Profilesvg />
        )}
        <input
          type='file'
          accept='image/*'
          id='prof-image'
          multiple={false}
          disabled={trigger}
          onChange={(e) => {
            let data = new Blob([e.target.files[0]])
            files.current = data
            set_image_src(URL.createObjectURL(data))
          }}
        />
        <label htmlFor='prof-image'></label>
      </div>
      <div className='prof-inp-container'>
        <input
          type='text'
          className='prof-inp'
          minLength={"1"}
          required
          id='prof-inp-1'
          ref={user_name}
          defaultValue={user_data.username}
        />
        <label htmlFor='prof-inp-1'>
          <svg
            viewBox='0 0 24 24'
            height={"3rem"}
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g
              id='SVGRepo_bgCarrier'
              strokeWidth='0'
            ></g>
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {" "}
              <path
                d='M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z'
                fill='none'
              ></path>{" "}
              <path
                d='M12.0001 6C10.3433 6 9.00012 7.34315 9.00012 9C9.00012 10.6569 10.3433 12 12.0001 12C13.657 12 15.0001 10.6569 15.0001 9C15.0001 7.34315 13.657 6 12.0001 6Z'
                fill='#20b038'
              ></path>{" "}
              <path
                d='M17.8948 16.5528C18.0356 16.8343 18.0356 17.1657 17.8948 17.4473C17.9033 17.4297 17.8941 17.4487 17.8941 17.4487L17.8933 17.4502L17.8918 17.4532L17.8883 17.46L17.8801 17.4756C17.874 17.4871 17.8667 17.5004 17.8582 17.5155C17.841 17.5458 17.8187 17.5832 17.7907 17.6267C17.7348 17.7138 17.6559 17.8254 17.5498 17.9527C17.337 18.208 17.0164 18.5245 16.555 18.8321C15.623 19.4534 14.1752 20 12.0002 20C8.31507 20 6.76562 18.4304 6.26665 17.7115C5.96476 17.2765 5.99819 16.7683 6.18079 16.4031C6.91718 14.9303 8.42247 14 10.0691 14H13.7643C15.5135 14 17.1125 14.9883 17.8948 16.5528Z'
                fill='#20b038'
              ></path>{" "}
            </g>
          </svg>
        </label>
      </div>
      <div className='prof-inp-container'>
        <input
          type='text'
          className='prof-inp'
          minLength={"1"}
          required
          ref={slogan}
          id='prof-inp-2'
          defaultValue={user_data.slogan}
        />
        <label htmlFor='prof-inp-2'>
          <Chatsvg />
        </label>
      </div>
      <button disabled={trigger}>
        {!trigger ? "Update" : <Loader size={"1.3"} />}
        <span className='prof-err'>something went wrong</span>
      </button>
    </form>
  )
}

export default Profile
