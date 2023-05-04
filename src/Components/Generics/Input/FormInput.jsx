import { useEffect, useState } from 'react'
import './Inputs.css'
// import './../avataricon.jpg'

const FormInput = ({ labelname, inputname, inputid, inptype, onchangecb }) => {
  return (
    <>
      <div className="CustomInput">
        <label htmlFor={inputid}>{labelname}</label>
        <input onChange={onchangecb} type={inptype} name={inputname} id={inputid} autoComplete="off" />
        <div className="InputLine"></div>
      </div>
    </>
  )
}

const FormImgUpload = ({ onchangecb, file}) => {
  useEffect(() => {
    if (file != null) document.getElementById("preview-image").src = URL.createObjectURL(file)
  },
    [file]
  )

  return (
    <>
      <div className='image-container'>
        <img src={file ?? "icon.png"}
          alt="preview" id='preview-image' />
        <label className='custom-file-btn'>
          Seleccionar Imagen...
          <input onChange={onchangecb} type="file" name='userimage' />
        </label>
      </div>
    </>
  )
}

export { FormInput, FormImgUpload }