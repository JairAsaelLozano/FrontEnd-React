import "./Search.css"
import PostCard from "../Post/cards/PostCard"
import UserCard from "./UserCard/UserCard"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

function SearchPostsView() {
  let { idCat, qry } = useParams()
  const prueba = getPostscategory(idCat)
  if (!prueba) return null
  return (
    <>
      <section className="acrylback search-section">
        <div className="simplescroll postcard-area">
          {
            prueba == null || prueba.success == false ? null : prueba.AllCategorys.map((elemento, indice) => {
              return (
                <div key={indice}>
                  <PostCard img={elemento.secure_url} title={elemento.TitlePost} id={elemento._id} imguser={elemento.Src} usrnickname={elemento.UserNickName} />
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}

function SearchUsersView() {
  let { idCat, qry } = useParams()
  const prueba = getUserscategory(qry)
  if (!prueba) return null
  return (
    <>
      <section className="acrylback search-section">
        <div className="simplescroll usercard-area">
          {
            prueba == null || prueba.success == false ? null : prueba.AllUser.map((elemento, indice) => {
              return (
                <div key={indice}>
                  <UserCard username={elemento.UserName} postcount={elemento.PostCounts} srcImg={elemento.Image.secure_url} id={elemento._id} />
                </div>
              )
            })
          }
        </div>
      </section>
    </>
  )
}


const getPostscategory = (name) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`http://localhost:3000/api/category/${name}`, {
          method: 'GET',
        })
      ).json();
   

      setData(fetchresult)
    }

    dataFetch()
  }, [])

  return data
}

const getUserscategory = (name) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`http://localhost:3000/auth/users/${name}`, {
          method: 'GET',
        })
      ).json();

      setData(fetchresult)
    }

    dataFetch()
  }, [])

  return data
}

function Search() {
  let { idCat, qry } = useParams()

  return (
    <>
      <div className="background search-container">
        {idCat === undefined ? null : <SearchPostsView />}
        {qry === undefined ? null : <SearchUsersView />}
      </div>
    </>
  )
}

export default Search