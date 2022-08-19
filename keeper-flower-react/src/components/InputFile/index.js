import React, { useEffect, useState } from 'react'
import arrayBufferToBase64 from '../../utils/arrayBufferToBase64'

const InputFile = ({ customFile, onChange }) => {
  const [file, setFile] = useState(null)

  const retrieveFile = (e) => {
    const data = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(Buffer.from(reader.result))
    }

    e.preventDefault()
  }

  useEffect(() => onChange(file), [file])

  return (
    <div className='flex items-center space-x-6 justify-center'>
      <div className='shrink-0'>
        <img
          className={`h-16 w-16 object-cover rounded-full ${!file ? 'animate-bounce' : ''}`}
          src={customFile
            ? `data:image/png;base64,${arrayBufferToBase64(customFile)}`
            : 'https://www.inkling.com/wp-content/uploads/2021/06/SD-default-image.png'}
          alt='NFT'
        />
      </div>
      <label className='block'>
        <span className='sr-only'>Choose profile photo</span>
        <input
          type='file'
          onChange={retrieveFile}
          className='block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
        '
        />
      </label>
    </div>
  )
}

export default InputFile
