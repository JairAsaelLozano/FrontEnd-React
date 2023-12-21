import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Upload.css"

function Upload() {
  const nav = useNavigate()
  const [category, setCategory] = useState("")
  const [list, setList] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleuploadpost = async (e) => {
    e.preventDefault();
    e.target.disabled = true
    const token = sessionStorage.getItem("Token");
    const UserName = sessionStorage.getItem("UserName");

    const DataToSend = new FormData();
    DataToSend.append("UserName" , UserName)
    DataToSend.append("CategoryList" ,list )
    DataToSend.append("TitlePost" ,title )
    DataToSend.append("DescriptionPost" ,description )
    DataToSend.append("File" ,selectedFile )

    const peticion = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: DataToSend
    })
      .then(res => res.json())
      .then(res => {
        if(res.success == true){
          nav(res.url);
        }
        else{
          alert("Error al intentar hacer el post")
        }
      })
      .catch(error => {
       console.log(error)
      });

  }

  useEffect(() => {
    if (selectedFile != null) document.getElementById("preview-image-post").src = URL.createObjectURL(selectedFile)
  },
    [selectedFile]
  )
  
  return (
    <>
      <div className="background upload-container">
        <section className="acrylback upload-section">
          <div>
            <div className="border-el img-post-upload">
              <div className="img-post-preview">
                <img src="" alt="" id="preview-image-post" />
              </div>
              <label>
                <input type="file" name="uploadimagepost" onChange={(e) => { setSelectedFile(e.target.files[0]) }} file={selectedFile} />
                Subir Archivo
              </label>
            </div>
            <div className="border-el extra-post-stuff">
              <input className="border-el post-input" type="text" name="post-title" placeholder="Titulo..." onChange={(e) => setTitle(e.target.value)} />
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
              <textarea className="border-el post-input" name="post-description" placeholder="Descripcion..." id="" cols="30" rows="10" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>
          <div>
            <button onClick={handleuploadpost}>Publicar</button>
          </div>
        </section>

      </div>
    </>
  )
}

export default Upload