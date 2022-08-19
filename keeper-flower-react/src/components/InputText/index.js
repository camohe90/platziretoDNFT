import React from 'react'

const InputText = ({ label, id, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id} required
        onChange={onChange}
        value={value}
        className='appearance-none rounded-none relative block w-full
          px-3 py-2 border border-gray-300 placeholder-gray-500
          text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500
          focus:border-indigo-500 focus:z-10 sm:text-sm'
      />
    </div>
  )
}

export default InputText
