import React from 'react'

const Input = ({placeholder, action, type, value}) => {
  return (
    <input
          type={type}
          className="w-full bg-slate-100 px-7 py-4 ps-12 mr-4 rounded-xl"
          placeholder={placeholder}
          value={value}
          onChange={action}
        />
  )
}

export default Input
