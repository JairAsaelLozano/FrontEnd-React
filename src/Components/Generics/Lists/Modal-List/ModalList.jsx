import "./ModalList.css"
import ListLink from "./ListLink"
import { useState, useEffect } from "react"

const getpostinfo = (id_post) => {
  const [data, setData] = useState(null)
  console.log("getpostinfo24")
  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`http://localhost:3000/api/posts/${id_post}`, {
          method: 'GET',
        })
      ).json();
      console.log("intentos")
      console.log(fetchresult.respuesta)
      setData(fetchresult.respuesta)
    }

    dataFetch()
  }, [])

  return data
}

function ModalList({ id_post, openModal, onCloseFn }) {
  if (!openModal) return null
  const prueba = getpostinfo(id_post)
  const [Listas, setListas] = useState(null)
  const [content, setContent] = useState("")
  
  const obtenerListas = async () => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`http://localhost:3000/api/lists/user/Lists`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
    ).json();
    setListas(fetchresult.ListsFound)
  }

  useEffect(()=>{
    obtenerListas()
  }, [])
  // setLists(prueba2 == null ? null : prueba2.ListsFound)
  // const [Lists, setLists] = useState(prueba2.ListsFound) 
 
  if (!prueba) return null

  
  // console.log(Lists)

  const crearlista = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("Token");

    const DataToSend = new FormData();
    DataToSend.append("listname", content)

    const peticion = await fetch('http://localhost:3000/api/lists/', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: DataToSend
    })
      .then(res => res.json())
      .then(async res => {
        if (res.success == true) {
          await obtenerListas()
        }
        else {
          alert("Error al intentar hacer el post")
        }
      })
      .catch(error => {
        console.log(error)
      });

  }
  
  return (
    <div className="modalOverlay">
      <div className="overlay-effect"></div>
      <div className="modalContainer" id="modalList">
        <section className="new-list-area">
          <p onClick={onCloseFn} className="closeBtn">X</p>
          <div>
            <input type="text" placeholder="nombre de lista" onChange={(e) => { setContent(e.target.value) }} />
            <button onClick={crearlista}>Crear nueva lista</button>
          </div>
        </section>
        <section className="created-lists-area">
          <div className="simplescroll">
            {
              Listas == null || Listas.success == false ? null : Listas.map((elemento, indice) => {
                return (
                  <div key={indice}>
                    <ListLink id={elemento._id} name={elemento.ListName} post={prueba} ></ListLink>
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default ModalList