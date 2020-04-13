import React from 'react'

export const InputText = ({ type, value, onChange, style, name, id, placeholder }) => {
  return (
    <input
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
