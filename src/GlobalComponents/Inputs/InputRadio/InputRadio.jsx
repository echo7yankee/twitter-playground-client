import React from 'react'

export const InputRadio = ({
  type,
  id,
  name,
  checked,
  value,
  onChange
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
    />
  )
}
