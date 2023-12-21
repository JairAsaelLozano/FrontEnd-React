import "./PostPage.css"
import CommentPill from "../CommentPill/CommentPill"
import { useState, useEffect } from "react"
import { useParams } from "react-router";


const getpostinfo = (id) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`http://localhost:3000/api/posts/${id}`, {
          method: 'GET',
        })
      ).json();
   

      setData(fetchresult.respuesta)
    }

    dataFetch()
  }, [])

  return data
}

const getcomments = (id_post) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`http://localhost:3000/api/coments/getcoments/${id_post}`, {
          method: 'GET',
        })
      ).json();

      setData(fetchresult)
    }

    dataFetch()
  }, [])

  return data
}

function PostPage() {
  let { id } = useParams();
  const prueba = getpostinfo(id);
  const prueba2 = getcomments(id)

  const [content, setContent] = useState("")
  if (!prueba) return null;
  if (!prueba2) return null;

  const CreateComment = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("Token");

    const DataToSend = new FormData();
    DataToSend.append("id_post", prueba.Post._id)
    DataToSend.append("content", content)

    const peticion = await fetch('http://localhost:3000/api/coments/', {
      method: 'POST',
      headers: {
        'x-access-token': token
      },
      body: DataToSend
    })
      .then(res => res.json())
      .then(res => {
        if (res.success == true) {
          alert("comentario enviado")
        }
        else {
          alert("Error al intentar hacer el coment")
        }
      })
      .catch(error => {
        console.log(error)
      });

  }

  return (
    <>
      <div className="background postpage-container">
        <div className="container-overflow simplescroll">
          <section className="acrylback post-section ">
            <div className="post-preview">
              <img src={prueba.Post.Image.secure_url} alt="post-image" />
              <div>
                <img src={prueba.User.Image.secure_url} alt="user-image" />
                <h3>{prueba.User.UserName}</h3>
              </div>
              <div>
                <p>{prueba.Post.DescriptionPost}</p>
              </div>
            </div>
            <div className="comments-preview">
              <div>
                <input onChange={(e) => { setContent(e.target.value) }} type="text" />
                <button onClick={CreateComment}>Send</button>
              </div>
              {/* <div>
                <CommentPill commentContent="hola" isOwner={true}></CommentPill>
                <CommentPill commentContent="hola" isOwner={true}></CommentPill>
                <CommentPill commentContent="hola" isOwner={true}></CommentPill>
              </div> */}

              {
                prueba2 == null || prueba2.success == false ? null : prueba2.Comments.comments.map((elemento, indice) => {
                  return (
                    <div key={indice}>
                      <CommentPill commentContent={elemento.Content} img={elemento.Src} user={elemento.UserNickName} isOwner={true}></CommentPill>
                    </div>
                  )
                })
              }
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default PostPage