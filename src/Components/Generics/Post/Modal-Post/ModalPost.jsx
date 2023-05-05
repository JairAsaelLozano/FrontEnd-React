import "./ModalPost.css"
import { useState, useEffect } from "react"
import CommentPill from "../CommentPill/CommentPill"

const getpostinfo = (id_post) => {
  const [data, setData] = useState(null)
  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`https://backendweb2-prueba-production.up.railway.app/api/posts/${id_post}`, {
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
  const token = sessionStorage.getItem("Token");
  useEffect(() => {
    const dataFetch = async () => {
      const fetchresult = await (
        await fetch(`https://backendweb2-prueba-production.up.railway.app/api/coments/getcoments/${id_post}`, {
          method: 'GET',
          headers: {
            'x-access-token': token
          }
        })
      ).json();

      setData(fetchresult)
    }

    dataFetch()
  }, [])

  return data
}

function ModalPost({ openModal, onCloseFn, id_post }) {

  if (!openModal) return null
  const prueba = getpostinfo(id_post)
  const prueba2 = getcomments(id_post)
  const [content, setContent] = useState("")

  if (!prueba) return null
  if (!prueba2) return null



  const CreateComment = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("Token");

    const DataToSend = new FormData();
    DataToSend.append("id_post", prueba.Post._id)
    DataToSend.append("content", content)

    const peticion = await fetch('https://backendweb2-prueba-production.up.railway.app/api/coments/', {
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




  const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, laboriosam. Ullam doloribus aspernatur deserunt hic, culpa earum. Eum et quam eligendi ea velit quasi maiores, provident consequatur, perspiciatis blanditiis harum!"
  return (
    <>
      {
        <div className="modalOverlay">
          <div className="overlay-effect"></div>
          <div className="modalContainer" id="modalPost">
            <section className="post-left-section">
              <img src={prueba.Post.Image.secure_url} alt="" />
            </section>
            <section className="post-right-section">
              <p onClick={onCloseFn} className="closeBtn">X</p>
              <div className="post-description">
                <div>
                  <img src={prueba.User.Image.secure_url} alt="user-image" />
                  <h3>{prueba.User.UserName}</h3>
                </div>
                <div>
                  {prueba.Post.DescriptionPost}
                </div>
              </div>
              <div className="post-comments">
                <div className="user-comments simplescroll">
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
                <div>
                  <input onChange={(e) => { setContent(e.target.value) }} type="text" />
                  <button onClick={CreateComment} >Send</button>
                </div>
              </div>
            </section>
          </div>
        </div>
      }
    </>
  )
}

export default ModalPost