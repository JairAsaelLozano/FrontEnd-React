import "./EditProfile.css"
import { FormInput, FormImgUpload } from "../Input/FormInput"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const verify = () => {
  const nav = useNavigate()
  const [previewimg, setPreviewimg] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [descripcion, setDescripcion] = useState("")

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    const intento = async () => {
      const peticion = await fetch('https://backendweb2-prueba-production.up.railway.app/auth/getonlyperfil', {
        method: 'POST',
        headers: {
          'x-access-token': token
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.success == true) {
            setPreviewimg(res.data.Image.secure_url)
            setEmail(res.data.Email)
            setFullname(res.data.FullName)
            setUsername(res.data.UserName)
            setDescripcion(res.data.description)
          }
          else {
            alert("Porfavor haz login antes de acceder a Perfil")
            nav('/home');
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
    intento();
  }, [])

  return {previewimg ,email ,fullName ,username ,descripcion}
}

function EditProfile({ openModal, onCloseFn, prevImg }) {
  const prueba = verify();
  const [newImage, setNewImage] = useState(null)
  
  const [previerimg, setPreviewimg] = useState("")
  const [Email, setEmail] = useState("")
  const [FullName, setFullname] = useState("")
  const [Username, setUsername] = useState("")
  const [Descripcion, setDescripcion] = useState("")
  const [Oldpassword, setOldPassword] = useState("")
  const [Newpassword, setNewPassword] = useState("")
  const [Confirmpassword, setConfirmPassword] = useState("")
  const [para ,setPara] = useState(0)

  if (!openModal) return null
  if (!prueba) return null

  const hack = () =>{
    if(para == 0){
      setPreviewimg(prueba.previewimg)
      setEmail(prueba.email)
      setFullname(prueba.fullName)
      setUsername(prueba.username)
      setDescripcion(prueba.descripcion)
      setPara(1)
    }
  }
  hack()

  const handleChangeImage = (e) => {
    setNewImage(e.target.files[0])
  }
 
  const sendupdateuser = (e) => {  // ENVIAR LOS CAMBIOS DESEADOS PARA ACTUALIZAR EL User
    e.preventDefault()
    //confirmacion de la contraseña
    const token = sessionStorage.getItem("Token");

    const DataToSend = new FormData();
    DataToSend.append("UserName", Username)
    DataToSend.append("Email", Email)
    DataToSend.append("FullName", FullName)
    DataToSend.append("description", Descripcion)
    DataToSend.append("File", newImage)
 
    fetch(`https://backendweb2-prueba-production.up.railway.app/auth/editperfil`, {
      method: 'PUT',
      headers: {
        'x-access-token': token,
      },
      body: DataToSend
    })
      .then(res => res.json())
      .then(res => {
        if (res.success == true) {
          nav('/profile');
        }
        else {
          alert("No puedes editar sin autenticarte antes")
          nav('/home');
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const sendupdatepassword = (e) => {  // ENVIAR LOS CAMBIOS DESEADOS PARA ACTUALIZAR EL User
    e.preventDefault()
    const token = sessionStorage.getItem("Token");
    
    if (Newpassword != Confirmpassword) {
      alert("Contraseñas no coinciden")
      return
    }

    const DataToSend = new FormData();
    DataToSend.append("OldPassword", Oldpassword)
    DataToSend.append("NewPassword", Newpassword)

    


    fetch(`https://backendweb2-prueba-production.up.railway.app/auth/cambiarcontrasena`, {
      method: 'PUT',
      headers: {
        'x-access-token': token,
      },
      body: DataToSend
    })
      .then(res => res.json())
      .then(res => {
        if (res.success == true) {
          nav('/profile');
        }
        else {
          alert("No puedes editar sin autenticarte antes")
          nav('/home');
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="modalOverlay">
        <div className="overlay-effect"></div>
        <div className="modalContainer" id="EditProfileModal">
          <p onClick={onCloseFn} className="closeBtn">X</p>
          <div>
            <div className="edit-forms">
              <form onSubmit={sendupdateuser} id="form-editinfo">
                <FormImgUpload onchangecb={handleChangeImage} file={newImage == null ? prevImg : newImage} loading={previerimg}/>
                <textarea defaultValue={Descripcion} className="border-el post-input simplescroll" name="post-description" placeholder="Descripcion..." id="" cols="30" rows="10"
                onChange={({target})=> setDescripcion(target.value)}></textarea>
                <FormInput loading={Email} labelname="Email" inptype="text" onchangecb={({target}) => { setEmail(target.value)}} />
                <FormInput loading={FullName} labelname="Nombre Completo" inptype="text" onchangecb={({target}) => { setFullname(target.value)}} />
                <FormInput loading={Username} labelname="Nombre De usuario" inptype="text" onchangecb={({target}) => { setUsername(target.value)}} />
                <button type="submit">Editar Informacion</button>
              </form>
              <div>
                <form onSubmit={sendupdatepassword} id="form-editpasswords" action="form-editpassword">
                  <FormInput labelname="Contraseña Antigua" inptype="password" onchangecb={({target}) => setOldPassword(target.value)}/>
                  <FormInput labelname="Contraseña Nueva" inptype="password" onchangecb={({target}) => setNewPassword(target.value)}/>
                  <FormInput labelname="Confirmar Contraseña" inptype="password" onchangecb={({target}) => setConfirmPassword(target.value)}/>
                  <button type="submit">Actualizar Contraseña</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile