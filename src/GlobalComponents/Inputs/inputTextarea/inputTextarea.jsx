import React from 'react'

export const InputTextArea = ({ type, value, onChange, style, name, id, placeholder }) => {
  return (
    <textarea
      type={type}
      value={value}
      onChange={onChange}
      style={style}
      name={name}
      id={id}
      placeholder={placeholder}
    />
  )
}
