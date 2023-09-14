import React from "react"

const Email = ({ set_takeinput, take_input }) => {
  return (
    <div className='log_inp_div'>
      <div className='log_wrap'>
        <input
          type='email'
          required={true}
          className='log_inp'
          placeholder=' '
          id='email'
          value={take_input}
          onChange={(e) => {
            set_takeinput(e.target.value)
          }}
        />
        <label htmlFor='email'>Enter Your Email</label>
      </div>
      <div className='log_symbol'>
        <svg
          viewBox='0 0 24 24'
          fill='none'
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
              d='M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>{" "}
            <path
              d='M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>{" "}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Email
