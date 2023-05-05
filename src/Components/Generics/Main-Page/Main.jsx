import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import "./Main.css"
import Post from "../Post/Post"
import ModalPost from "../Post/Modal-Post/ModalPost"
import ModalList from "../Lists/Modal-List/ModalList"
import CategoryPill from "./Categories-Pills/CategoryPill"
import { useNavigate } from 'react-router-dom'

const useFetchPosts = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch('https://backendweb2-prueba-production.up.railway.app/api/posts/allposts', {
          method: 'GET',
        })
      ).json();

      setData(fetchresult.PostsFound)
    }

    dataFetch()
  }, [])

  return data
}

const getCategorys = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch('https://backendweb2-prueba-production.up.railway.app/api/category/', {
          method: 'GET',
        })
      ).json();
    
      setData(fetchresult)
    }

    dataFetch()
  }, [])

  return data
}

const GetProfileWithVerify = () => {
  const [data, setData] = useState(null)
  const nav = useNavigate()
  useEffect(() => {
    let ignore = false;
    const token = sessionStorage.getItem("Token");
    const intento = async () => {
      const peticion = await fetch('https://backendweb2-prueba-production.up.railway.app/auth/getonlyperfil', {
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
        nav('../home');
      }
    }
    intento();
    return () => {
      ignore = true;
    };
  }, [])

  return data
}

function Main() {
  const nav = useNavigate()
  const Posts = useFetchPosts() // custom hook para recibir los posts del fetch
  const categorys = getCategorys();
  const [search, setSearch] = useState(null);
  const prueba = GetProfileWithVerify();
  if (!Posts) return null
  if (!categorys) return null
  if (!prueba) return null

 
  const Buscar = async (e) => {
    e.preventDefault();
    var primerCaracter = search.charAt(0);
    if (primerCaracter == '@') {
      const str = search
      const newStr = str.slice(1)
      nav(`/search/users/${newStr}`);
    }
    else {
      nav(`/search/posts/${search}`);
    }

  }

  return (
    <>
      <div className="background home-container">
        <section className="acrylback left-section">
          <div className="search-bar-container">
            <input type="search" onChange={(e) => setSearch(e.target.value)} />
            <input type="button" value="Buscar" onClick={Buscar} />
          </div>
          <div className="top-categories ">
            <div className="simplescroll">
              {
                Posts == null || categorys.success == false ? null : categorys.AllCategorys.map((elemento, indice) => {
                  return (
                    <div key={indice}>
                      <CategoryPill CategoryNumber={indice} CategoryName={elemento.CategoryName} ContentCount={elemento.TotalPostsUsing} ></CategoryPill>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>

        <section className="acrylback mid-section">
          <div className="simplescroll">
            {
              Posts == null || categorys.success == false ? null : Posts.map((elemento, indice) => {
                return (
                  <div key={indice}>
                    <Post id_post={elemento._id} srcPost={elemento.Image.secure_url}></Post>
                  </div>
                )
              })
            }
          </div>
        </section>
        <section className="acrylback right-section">
          <div className="top-content">
            <img src={prueba.Image.secure_url} alt="imagen perfil" />
            <h1>{prueba.UserName}</h1>
          </div>
          <div className="fill-content">   
            <Link className='btn-anim' to="/upload">Publicacion Nueva</Link>
            <div className="separator"/>
            <Link className='btn-anim' to="/profile">Ver Perfil</Link>
            <Link className='btn-anim' to="/lists">Ver Listas</Link>
            <div className="separator"/>
            <Link className='btn-anim' to="/galeries/all">Ver todas las galerias</Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Main