import './LRForms.css'
// import FormInput  from './Input/FormInput'
import { FormInput, FormImgUpload } from '../Input/FormInput'
import Presentation from './Presentation'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Register() {
  const nav = useNavigate()
  const [_email, setEmail] = useState("")
  const [_fullname, setFullName] = useState("")
  const [_username, setUserName] = useState("")
  const [_password, setPassword] = useState("")
  const [_confirmpassword, setConfirmPassword] = useState("")
  const [_selectedfile, setSelectedFile] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = new FormData()
    data.append("UserName", _username)
    data.append("Password", _password)
    data.append("Email", _email)
    data.append("FullName", _fullname)
    data.append("File", _selectedfile)


    const peticion = fetch('https://backendweb2-prueba-production.up.railway.app/auth/Register', {
      method: 'POST',
      body: data
    }).json()
    if(peticion.success == true){  //TODO RETURN LOGIN
      nav('/login');
      console.log("debi reedireccionar")
    }
  }


  return (
    <>
      <div className='background'>
        <Presentation />
        <div className='Form-container'>
          <div>
            <form onSubmit={handleRegister} id="RegisterForm" className="LR-Forms shadow" method="POST" encType='multipart/form-data'>
              <div className='container-left'>
                <FormInput
                  onchangecb={(e) => { setEmail(e.target.value) }} labelname="Email" inputname="email" inputid="email_inp" inptype="email" />
                <FormInput
                  onchangecb={(e) => { setFullName(e.target.value) }} labelname="Nombre Completo" inputname="name" inputid="name_inp" inptype="text" />
                <FormInput
                  onchangecb={(e) => { setUserName(e.target.value) }} labelname="Usuario" inputname="username" inputid="user_inp" inptype="text" />
                <FormInput
                  onchangecb={(e) => { setPassword(e.target.value) }} labelname="Contraseña" inputname="password" inputid="password_inp" inptype="password" />
                <FormInput
                  onchangecb={(e) => { setConfirmPassword(e.target.value) }} labelname="Confirmar Contraseña" inputname="passwordclone" inputid="passwordclone_inp" inptype="password" />
              </div>
              <div className='container-right'>
                <FormImgUpload onchangecb={(e) => { setSelectedFile(e.target.files[0]) }} file={_selectedfile} />
                <button className='btn-anim'>Registrarse</button>
              </div>
            </form>
            <div className='LR-switch shadow-bottom'>
              <Link to="/login">¿ya tienes cuenta? Inicia sesion aqui!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register