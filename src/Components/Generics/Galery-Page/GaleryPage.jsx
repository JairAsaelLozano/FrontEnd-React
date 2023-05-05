import "./GaleryPage.css"
import { useParams } from "react-router-dom"
import GaleryCard from "./GaleryCard/GaleryCard"
import { useEffect, useState } from "react"

function GaleryPage({ allGaleries }) {
  const [galeryList, setGaleryList] = useState(null)
  const [galeryName, setgaleryName] = useState(null)

  let { userid } = useParams()
  // console.log(userid)

  const getGaleryList = async () => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`https://backendweb2-prueba-production.up.railway.app/api/galery`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
    ).json();
    if (fetchresult.success == true) {
      setGaleryList(fetchresult.GaleryFound)
    }
  }

  const getAllGaleries = async () => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`https://backendweb2-prueba-production.up.railway.app/api/galery/all`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
    ).json();
    if (fetchresult.success == true) {
      setGaleryList(fetchresult.GaleryFound)
    }
  }

  const getGaleriesByUserId = async () => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`https://backendweb2-prueba-production.up.railway.app/api/galery/user/${userid}`, {
        method: 'GET',
        headers: {
          'x-access-token': token
        },
      })
    ).json();
    if (fetchresult.success == true) {
      setGaleryList(fetchresult.GaleryFound)
    }
  }

  useEffect(() => {
    if(!allGaleries && !userid) getGaleryList()
    if(allGaleries) getAllGaleries()
    if(userid) getGaleriesByUserId()
  }, [])

  const createGalery = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("Token");

    const DataToSend = new FormData();
    DataToSend.append("GaleryName", galeryName)

    const peticion = await fetch('https://backendweb2-prueba-production.up.railway.app/api/galery/', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: DataToSend
    })
      .then(res => res.json())
      .then(async res => {
        if (res.success == true) {
          alert("se creo la galeria")
          await getGaleryList()
        }
        else {
          alert("Error al intentar hacer la galeria")
        }
      })
      .catch(error => {
        console.log(error)
      });

  }
  // console.log(galeryList)
  return (
    <>
      <div className="background galery-container">
        <section className="acrylback galery-section">
          {
            userid || allGaleries ? null :
              <div className="createGalery">
                <input onChange={(e) => setgaleryName(e.target.value)} type="text" />
                <button onClick={createGalery} >Crear Galeria</button>
              </div>
          }
          <div className="simplescroll galeryCard-area">
            {
              galeryList == null || galeryList.success == false ? null : galeryList.map((elemento, indice) => {
                return (
                  <div key={indice}>
                    <GaleryCard galeryInfo={elemento} />
                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default GaleryPage