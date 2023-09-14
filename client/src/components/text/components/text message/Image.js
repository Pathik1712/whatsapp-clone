import React, { memo } from "react"
import Seen from "../../../svg/Seen"
import Imagesvg from "../../../svg/Imagesvg"
import Download from "../../../svg/Download"
import Filehandler from "./Filehandler"
import File from "../../../svg/File_svg.js"
import Video from "../../../svg/Video.js"

const Image = ({ item, notification_count, email_id, num }) => {
  return (
    <div
      className={
        item.chats_from === email_id ? "text-file-user" : "text-file-other"
      }
    >
      {item.chats_from === email_id ? (
        <section className='text-user-sec'>
          {item.text_type.split("/")[0] === "image" ? (
            <Imagesvg />
          ) : item.text_type.split("/")[0] === "video" ? (
            <Video />
          ) : (
            <File />
          )}
          <p>
            {item.text_info
              ? item.text_info
              : "." + item.text_type.split("/")[1]}
          </p>
          <div>
            <span className='text-time-span'>{item.time}</span>
            {item.chats_from === email_id ? (
              <Seen
                color={notification_count <= num ? "darkgray" : "#34B7F1"}
              />
            ) : (
              ""
            )}
          </div>
        </section>
      ) : (
        <>
          {item.hasOwnProperty("src") ? (
            <div className='text-div-image'>
              <Filehandler
                type={item.text_type.split("/")[0]}
                src_link={item.src}
                src_type={item.text_type.split("/")[1]}
              />
              <p>
                {item.text_info
                  ? item.text_info
                  : "." + item.text_type.split("/")[1]}
              </p>
              <div>
                <a
                  href={item.src}
                  download={`whatsappfile.${item.text_type.split("/")[1]}`}
                >
                  <Download />
                </a>
                <span className='text-time-span'>{item.time}</span>
              </div>
            </div>
          ) : (
            <section className='text-user-other'>
              {item.text_type.split("/")[0] === "image" ? (
                <Imagesvg />
              ) : item.text_type.split("/")[0] === "video" ? (
                <Video />
              ) : (
                <File />
              )}
              <p>
                {item.text_info
                  ? item.text_info
                  : "." + item.text_type.split("/")[1]}
              </p>
              <span className='text-time-span'>{item.time}</span>
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default memo(Image)
