import { useState, useEffect } from "react"
import "./ModalEdit.css"
import { useNavigate } from 'react-router-dom'

const getpostinfo = (id_post) => { //OBTENER INFO DEL POST PARA MOSTRAR EN VENTANA MODAL
  const [descripcion, setDescripcion] = useState("")
  const [title, setTitle] = useState("")
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`https://backendweb2-prueba-production.up.railway.app/api/posts/${id_post}`, {
          method: 'GET',
        })
      ).json();
      setDescripcion(fetchresult.respuesta.Post.DescriptionPost)
      setTitle(fetchresult.respuesta.Post.TitlePost)
      setCategories(fetchresult.respuesta.Post.CategoryList)
    }
    
    dataFetch()
  }, [])
  
  return { descripcion, title, categories }
}

function ModalEdit({ id_post, openModal, onCloseFn }) {
  const nav = useNavigate()
  const prueba = getpostinfo(id_post)
  const [category, setCategory] = useState("")
  const [list, setList] = useState(["test", "test2"])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [para ,setPara] = useState(0)
 
  

  if (!openModal) return null
  if (!prueba) return null

  // setDescription(prueba.descripcion)
  
  const hack = () =>{
    
    if(para == 0){

      let str = prueba.categories
      let arr = str.split(',')
  
      setDescription(prueba.descripcion) 
      setTitle(prueba.title)
      setList(arr)
      setPara(1)
    }
  }
  hack()
  const onMouseEPill = (e) => {
    e.target.style.textDecoration = "line-through"
  }

  const onMouseLPill = (e) => {
    e.target.style.textDecoration = "none"
  }

  const onEnterKeyUp = ({ key, target }) => {
    if (target.value == "") {
      return
    }
    if (key == "Enter") {
      setList([...list, category])
      setCategory("")
    }
  }

  const deleteCategoryfromList = (e) => {
    const removeId = e.target.dataset.remove;
    const newList = list.filter((el, i) => {
      return (i != removeId)
    })

    setList(newList)
    setCategory("")
  }

 
  
  
  const sendupdatepost = () => {  // ENVIAR LOS CAMBIOS DESEADOS PARA ACTUALIZAR EL POST
    const token = sessionStorage.getItem("Token");
    
    const DataToSend = new FormData();
    DataToSend.append("TitlePost", title)
    DataToSend.append("CategoryList", list)
    DataToSend.append("DescriptionPost", description)

    fetch(`https://backendweb2-prueba-production.up.railway.app/api/posts/editpost/${id_post}`, {
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
    <>{prueba == null ? null :
      
      <div className="modalEdit-overlay">
        <div className="overlay-effect"></div>
        <div className="modalEditContainer">
          <p onClick={onCloseFn} className="closeBtn">X</p>
          <div className="modalEdit">
            <input value={title} className="border-el post-input" type="text" name="post-title" placeholder="Titulo..." onChange={(e) => setTitle(e.target.value)} />
            <div>
              <input className="cat-input post-input" type="text" name="post-categories" placeholder="Categorias..."
                value={category}
                onChange={({ target }) => { setCategory(target.value) }}
                onKeyUp={onEnterKeyUp}
              />
              <div className="cat-section">
                <p>Categorias añadidas</p>
                <div className="simplescroll" id="cat">
                  {
                    list.map((category, i) => {
                      return (
                        <div className="cat-pill"
                          data-remove={i}
                          key={i}
                          onMouseEnter={onMouseEPill}
                          onMouseLeave={onMouseLPill}
                          onClick={deleteCategoryfromList}
                        >
                          {category}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <textarea value={description} className="border-el post-input" name="post-description" placeholder="Descripcion..." id="" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div>
            <button onClick={sendupdatepost}>Guardar Cambios</button>
          </div>
        </div>
      </div>}
    </>
  )
}

export default ModalEdit