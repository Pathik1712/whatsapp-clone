import React from "react"

const Password = ({ take_pass, set_take_pass, label, id = "pass" }) => {
  return (
    <div className='log_inp_div'>
      <div className='log_wrap'>
        <input
          type='password'
          minLength={8}
          onChange={(e) => {
            set_take_pass(e.target.value)
          }}
          value={take_pass}
          className='log_inp'
          placeholder=' '
          id={id}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      <div className='log_symbol'>
        <svg
          viewBox='0 0 48 48'
          xmlns='http://www.w3.org/2000/svg'
          fill='#000000'
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
            <g
              id='Layer_2'
              data-name='Layer 2'
            >
              {" "}
              <g
                id='invisible_box'
                data-name='invisible box'
              >
                {" "}
                <rect
                  width='48'
                  height='48'
                  fill='none'
                ></rect>{" "}
              </g>{" "}
              <g
                id='Layer_7'
                data-name='Layer 7'
              >
                {" "}
                <path d='M39,18H35V13A11,11,0,0,0,24,2H22A11,11,0,0,0,11,13v5H7a2,2,0,0,0-2,2V44a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V20A2,2,0,0,0,39,18ZM15,13a7,7,0,0,1,7-7h2a7,7,0,0,1,7,7v5H15ZM14,35a3,3,0,1,1,3-3A2.9,2.9,0,0,1,14,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,23,35Zm9,0a3,3,0,1,1,3-3A2.9,2.9,0,0,1,32,35Z'></path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Password
