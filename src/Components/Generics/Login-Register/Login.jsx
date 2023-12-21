import './LRForms.css'
import { FormInput } from '../Input/FormInput'
import Presentation from './Presentation'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import LoginContext from '../../../Context/User/user.context'

function Login() {
  const nav = useNavigate()
  const {login, getLogin} = useContext(LoginContext)

  useEffect(()=>{
    getLogin()
  }, [])

  const [_name, setName] = useState("Darkeyeking")
  const [_password, setPassword] = useState("Dark_123")
  const handlelogin = async (event) => {
    event.preventDefault();

    const data = new FormData()
    data.append("UserName", _name)
    data.append("Password", _password)


    const peticion = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: data
    })
    const res = await peticion.json()

    sessionStorage.setItem("Token", res.token);
    sessionStorage.setItem("UserName", res.UserName);

    if (res.success == true) {
      getLogin(true)
      nav(res.url);
    }
    else {
      alert("Usuario o Contraseña no validos")
    }
  }

  return (
    <>
      <div className="background">
        <Presentation />
        <div className='Form-container'>
          <div>
            <form onSubmit={handlelogin} id="LoginForm" className="LR-Forms shadow" method='post'>
              <FormInput onchangecb={(e) => { setName(e.target.value) }} labelname="Usuario" inputname="InpTest" inputid="user_inp" inptype="text" />
              <FormInput onchangecb={(e) => { setPassword(e.target.value) }} labelname="Contraseña" inputname="InpTest" inputid="password_inp" inptype="password" />
              <button className='btn-anim' type="submit">Entrar</button>
            </form>
            <div className='LR-switch shadow-bottom'>
              <Link to="/register">¿No tienes una cuenta? Unete!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
