import React from "react"
import "./loading.css"

const Loading = () => {
  let width = window.innerHeight
  let arr = []
  for (let i = 0; i <= width / 100; i++) {
    arr.push(i)
  }
  return (
    <main className='loading_main'>
      {arr.map((i) => (
        <section
          className='loading_body'
          key={i}
        >
          <div className='loading_profile'></div>
          <div className='loading_line'>
            <span className='line1'></span>
            <span className='line2'></span>
            <span className='line3'></span>
          </div>
        </section>
      ))}
    </main>
  )
}
export default Loading
