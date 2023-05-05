import "./Lists.css"
import PostCard from "../Post/cards/PostCard"
import { useState, useEffect } from "react"
import ListPill from "./ListPill"

const ObtenerListasDelUsuario = () => {

}

const GetPostByList = () => {

}

function Lists() {
  const [Listas, setListas] = useState(null)
  const [changelist, setChangelist] = useState(null)

  const obtenerListas = async () => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`https://backendweb2-prueba-production.up.railway.app/api/lists/user/Lists`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
    ).json();
    if (fetchresult.success == false) {
      setListas(null)
      setChangelist(null)
    }
    if (fetchresult.success == true) {
      setListas(fetchresult)
      setChangelist(fetchresult.ListsFound[0])
    }
  }

  const borrarlista = async (id) => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`https://backendweb2-prueba-production.up.railway.app/api/lists/user/deleteLists/${id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token
        },
      })
    ).json();
    if (fetchresult.success == true) {
      window.location.reload(false);
    }
  }

  useEffect(() => {
    obtenerListas()
  }, [])



  return (
    <>
      <div className="background lists-container">
        <div className="acrylback">
          <div className="left-lists">
            <h1>Listas Guardadas</h1>
            {
              Listas == null || Listas.success == false ? null : Listas.ListsFound.map((elemento, indice) => {
                return (
                  <div key={indice}>
                    <ListPill clickfn={() => setChangelist(elemento)} listName={elemento.ListName} listState={elemento.PublicList} clickfnborrar={() => borrarlista(elemento._id)} ></ListPill>
                  </div>
                )
              })
            }
          </div>
          <div className="list-view">
            <div className="simplescroll postcard-area">
              {
                Listas == null || Listas.success == false ? null : changelist.ListPostStored.map((elemento, indice) => {
                  return (
                    <div key={indice}>
                      <PostCard img={elemento.SrcId} title={elemento.PostDescription} id={elemento.PostId} imguser={elemento.Src} usrnickname={elemento.UserNickName} />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lists