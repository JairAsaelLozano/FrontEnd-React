import { useParams } from "react-router-dom"
import "./GaleryView.css"
import GaleryPostCard from "./GaleryPostCard/GaleryPostCard";
import { useState, useRef, useEffect } from "react";

function GaleryView() {
  const [imglist, setImglist] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null);
  let { id } = useParams()

  const getGaleryList = async () => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`https://backendweb2-prueba-production.up.railway.app/api/galery/obtenerGalerias/imagenes/${id}`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
    ).json();
    if (fetchresult.success == true) {
      setImglist(fetchresult)
    }
  }

  useEffect(() => {
    addPostToGalery();
    return () => {
      setSelectedFile(null)
    }
  }, [selectedFile])

  useEffect(() => {
    getGaleryList();
  }, [])

  const addPostToGalery = async () => {

    const token = sessionStorage.getItem("Token");

    const DataToSend = new FormData();
    DataToSend.append("GaleryId", id)
    DataToSend.append("File", selectedFile)

    const peticion = await (
      await fetch('https://backendweb2-prueba-production.up.railway.app/api/galery/AddimgToGalery', {
        method: 'PUT',
        headers: {
          'x-access-token': token
        },
        body: DataToSend
      })
    ).json()
    if (peticion.success == false) {
      alert("Error al intentar insertar imagen")
    }
    if (peticion.success == true) {
      await getGaleryList();
    }
  }


  function handleSelectClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
  
    setSelectedFile(file);
  }


  return (
    <>
      <div className="background galeryview-container">
        <section className="acrylback galeryview-section">
          <div>{imglist == null || imglist.success == false ? null : imglist.GaleryFound[0].GaleryName}</div>
          <div className="simplescroll galeryPost-area">
            {
              imglist == null || imglist.success == false ? null : imglist.GaleryFound[0].Images.map((elemento, indice) => {
                return (
                  <div key={indice}>
                    <GaleryPostCard galeryInfo={elemento} />
                  </div>
                )
              })
            }

            <div className="newPost" id="select-button" onClick={handleSelectClick}>
              
            </div>
            <input
              type="file"
              id="file-input"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
        </section>
      </div>
    </>
  )
}

export default GaleryView