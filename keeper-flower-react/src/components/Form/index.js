import React, { useState } from 'react'
import { create } from 'ipfs-http-client'

// Contracts
import { mintToken } from '../../utils/contract'

// Components
import InputFile from '../InputFile'
import InputText from '../InputText'
import Alert from '../Alert'

import './style.scss'

const projectId = process.env.INFURA_ID
const projectSecret = process.env.INFURA_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
})

const Form = () => {
  const [loadding, setLoadding] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [minted, setMinted] = useState(false)
  const [file, setFile] = useState(null)
  const [orgMint, setOrgMint] = useState({ name: '', description: '' })
  const [attributes, setAttributes] = useState([
    { 'trait-type': '', value: '' }
  ])

  const uploadImg = async () => {
    try {
      const created = await client.add(file)
      return `https://keeper-flower-react.infura-ipfs.io/ipfs/${created.path}`
    } catch (error) {
      return null
    }
  }

  const changeAttributes = (key, value, i) => {
    const attrs = JSON.parse(JSON.stringify(attributes))
    attrs[i][key] = value
    setAttributes(attrs)
  }

  const handleAddAttr = () => setAttributes([
    ...attributes,
    { 'trait-type': '', value: '' }])

  const _setError = (msg) => {
    setLoadding(false)
    setError(msg)
  }

  const sendMint = async () => {
    setLoadding(true)
    if (!file) _setError('Debe seleccionar una imagen.')
    else if (orgMint.name === '') _setError('Debe ingresar el nombre para esta iteración.')
    else if (orgMint.description === '') {
      _setError('Debe ingresar la descripción para esta iteración.')
    } else if (attributes.find(el => el['trait-type'] === '' || el.value === '')) {
      _setError('Debe diligenciar al menos un atributo para esta iteración.')
    } else {
      setError('')
      try {
        const created = await client.add(JSON.stringify({
          ...orgMint,
          image: await uploadImg(),
          attributes
        }))
        await mint(`https://keeper-flower-react.infura-ipfs.io/ipfs/${created.path}`)
        setFile(null)
        setSaved(true)
        setOrgMint({ name: '', description: '' })
        setAttributes([{ 'trait-type': '', value: '' }])
      } catch (error) {
        _setError('No fue posible crear esta iteración, por favor intentelo mas tarde.')
      }
    }
  }

  const mint = async (url) => {
    mintToken(url).then(tx => {
      console.log(tx)
      setMinted(true)
      setLoadding(false)
    }).catch(err => {
      console.log(err)
      setLoadding(false)
    })
  }

  return (
    <div className='Form rounded-md max-w-md w-full space-y-4 mb-20'>
      <InputFile customFile={file} onChange={(_file) => setFile(_file)} />
      <InputText
        id='name' label='Nombre' value={orgMint.name}
        onChange={(e) => setOrgMint({ name: e.target.value, description: orgMint.description })}
      />
      <InputText
        id='description' label='Descripción' value={orgMint.description}
        onChange={(e) => setOrgMint({ name: orgMint.name, description: e.target.value })}
      />
      <h3 className='flex items-center justify-center gap-10'>
        Propiedades personalizadas
        <span className='text-4xl cursor-pointer' onClick={handleAddAttr}>⊕</span>
      </h3>
      {attributes.map((el, i) => (
        <div key={i} className='flex items-center space-x-3 justify-center'>
          <InputText
            id={`${i}-trait-type`} label='Trait Type'
            value={el['trait-type']}
            onChange={(e) => changeAttributes('trait-type', e.target.value, i)}
          />
          <InputText
            id={`${i}-value`} label='Value'
            value={el.value}
            onChange={(e) => changeAttributes('value', e.target.value, i)}
          />
        </div>
      ))}
      {(error !== '' || (saved && minted)) &&
        <Alert type={saved ? 'success' : 'error'}>
          {saved ? '¡Iteración guardada con éxito!' : error}
        </Alert>}
      <button
        className={`inline-flex justify-center py-2 px-4 border border-transparent
          shadow-sm text-sm font-medium rounded-md text-white
          bg-indigo-600 hover:bg-indigo-700 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          ${loadding && 'disabled:opacity-75 cursor-not-allowed'}`}
        onClick={() => !loadding && sendMint()}
      >
        Enviar
      </button>
    </div>
  )
}

export default Form
