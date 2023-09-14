import React from "react"

const Seen = ({ color }) => {
  return (
    <svg
      style={{ marginLeft: "5px" }}
      fill='none'
      height={"0.6rem"}
      viewBox='1 5 22 12.62'
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
          d='M2 14L5.23309 16.4248C5.66178 16.7463 6.26772 16.6728 6.60705 16.2581L15 6'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
        ></path>{" "}
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.87441 15.7802L11.603 17.163C12.4588 17.8477 13.7063 17.716 14.4003 16.8678L22.774 6.63327C23.1237 6.20582 23.0607 5.5758 22.6332 5.22607C22.2058 4.87635 21.5758 4.93935 21.226 5.36679L12.8524 15.6013L11.141 14.2322L9.87441 15.7802Z'
          fill={color}
        ></path>{" "}
      </g>
    </svg>
  )
}

export default Seen
