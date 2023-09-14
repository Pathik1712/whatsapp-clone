import React from "react"
import File from "../../../svg/File_svg.js"

const Filehandler = ({ type, src_link, src_type }) => {
  return (
    <>
      {type === "image" ? (
        <img
          src={src_link}
          alt='not'
          className='text-image'
        />
      ) : type === "video" ? (
        <video
          controls
          className='text-image'
        >
          <source
            src={src_link}
            type={`video/${src_type}`}
          />
        </video>
      ) : (
        <File />
      )}
    </>
  )
}

export default Filehandler
