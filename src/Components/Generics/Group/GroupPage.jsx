import { useState, useEffect } from "react"
import "./GroupPage.css"
import Post from "../Post/Post"

function OwnerGroupPageOptions({ openModalfn }) {

  return (
    <>
      <button className='btn-anim' >Nueva Publicacion</button>
      <button className='btn-anim' >Listas</button>
      <button className='btn-anim' >Seguidores</button>
    </>
  )
}
function VisitGroupPageOptions({ openModalfn }) {

  return (
    <>
      <button className='btn-anim' >Nueva Publicacion</button>
      <button className='btn-anim' >Listas</button>
      <button className='btn-anim' >Seguidores</button>
    </>
  )
}


function GroupPage() {
  const [openModal, setOpenModal] = useState(false)
  const prueba = null
  const isVisit = true
  return (
    <>
      {
        <div className="background group-container">
          <section className="acrylback group-section simplescroll">
            <div className="group-presentation">
              <img src="" alt="imagen grupo" />
              <div className="group-description">
                descripcion
              </div>
              <div>
                {isVisit ? <VisitGroupPageOptions /> : <OwnerGroupPageOptions/>}
              </div>
            </div>
            <div className="group-content simplescroll">
              {
                prueba == null ? null : prueba.post.map((elemento, indice) => {
                  return (
                    <div key={indice}>
                      <Post isLocalUser={eliminar} fndelete={deletepost} id_post={elemento._id} srcPost={elemento.Image.secure_url} ></Post>
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

export default GroupPage