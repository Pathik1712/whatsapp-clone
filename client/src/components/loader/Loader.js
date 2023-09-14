import React from "react"
import "./load.css"

const Loader = ({ size }) => {
  return (
    <span
      className='loader'
      style={{ height: `${size}rem` }}
    ></span>
  )
}

export default Loader
