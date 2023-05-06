import { useState, useEffect } from "react"
import "./Profile.css"
import Post from "../Post/Post"
import EditProfile from "./EditProfile"
import { useNavigate, useParams } from "react-router-dom"

const GetProfileWithVerify = () => {
  const [data, setData] = useState(null)
  const nav = useNavigate()
  useEffect(() => {
    let ignore = false;
    const token = sessionStorage.getItem("Token");
    const intento = async () => {
      const peticion = await fetch('https://backendweb2-prueba-production.up.railway.app/auth/perfil', {
        method: 'POST',
        headers: {
          'x-access-token': token
        }
      })
      const res = await peticion.json()
      if (res.success == true) {
        if (!ignore) {
       
          setData(res.data)
        }
      }
      else {
        alert("Porfavor haz login antes de acceder a Perfil")
        nav('/home');
      }
    }
    intento();
    return () => {
      ignore = true;
    };
  }, [])

  return data
}

const GetProfileVisit = (id) =>{
  const [data, setData] = useState(null)
  const nav = useNavigate()
  useEffect(() => {
    let ignore = false;
    const intento = async () => {
      const peticion = await fetch(`https://backendweb2-prueba-production.up.railway.app/auth/perfil/${id}`, {
        method: 'GET'
      })
      const res = await peticion.json()
      if (res.success == true) {
        if (!ignore) {
    
          setData(res.data)
        }
      }
      else {
        alert("Porfavor haz login antes de acceder a Perfil")
        nav('/home');
      }
    }
    intento();
    return () => {
      ignore = true;
    };
  }, [])

  return data
}

function VisitProfileOptions({userid}) {
  const nav = useNavigate()
  return (
    <>
      <button className='btn-anim' >seguir</button>
      <button className='btn-anim' onClick={() => nav(`/user/${userid}/galeries`)}>Galerias</button>
    </>
  )
}

function LocalProfileOptions({ openModalfn }) {
  const nav = useNavigate()
  return (
    <>
      <button className='btn-anim' onClick={() => nav("/upload")}>Nueva Publicacion</button>
      <button className='btn-anim' onClick={() => nav("/")}>Listas</button>
      <button className='btn-anim' onClick={() => nav("/galeries")}>Galerias</button>
      <button onClick={openModalfn} className='btn-anim' >Editar Perfil</button>
    </>
  )
}

const deletepost = (id_post) => {
  const token = sessionStorage.getItem("Token");
  const funcion = async () => {
    const peticion = await fetch(`https://backendweb2-prueba-production.up.railway.app/api/posts/delete/${id_post}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success == true) {
          nav('/profile');
       
        }
        else {
          alert("No puedes borrar sin autenticarte antes")
          nav('/home');
    
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  funcion();
}

function Profile() {
  let { id } = useParams();
  const [openModal, setOpenModal] = useState(false)
  
  const isVisit = !(id === undefined)

  const prueba = isVisit ? GetProfileVisit(id) : GetProfileWithVerify();

  const handleOpenModal = () => {
    if (!openModal) setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }


  const eliminar = true;


  return (
    <>
      {
        prueba == null ? null :
          <div className="background profile-container">
            <section className="acrylback profile-section simplescroll">
              <div className="profile-presentation">
                <img src={prueba.user.Image.secure_url} alt="imagen perfil" />
                <div className="profile-description">
                  {prueba.user.description}
                </div>
                <div>
                  {isVisit ? <VisitProfileOptions userid={id} /> : <LocalProfileOptions openModalfn={handleOpenModal} />}
                </div>
                <EditProfile openModal={openModal} onCloseFn={handleCloseModal}></EditProfile>
              </div>
              <div className="profile-content simplescroll">
                {
                  prueba.post.reverse().map((elemento, indice) => {
                    return (
                      <div key={indice}>
                        <Post isLocalUser={isVisit} fndelete={deletepost} id_post={elemento._id} srcPost={elemento.Image.secure_url} ></Post>
                      </div>
                    )
                  })
                }
              </div>
            </section>
          </div>
      }
    </>
  )
}

export default Profile