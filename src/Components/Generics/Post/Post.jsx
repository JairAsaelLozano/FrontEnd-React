import "./Post.css"
import ModalList from "../Lists/Modal-List/ModalList"
import ModalEdit from "./Modal-Edit/ModalEdit"
import ModalPost from "./Modal-Post/ModalPost"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

function Post({ isLocalUser, fndelete, srcPost, id_post}) {
  const nav = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState("")

  const openModalfn = () => {
    if (!openModal)setOpenModal(true)
  }
  const setIdPost = (id_post) => {
    if (!openModal)setSelectedPost(id_post)
  }

  const closeModalfn = () => {
    setOpenModal(false)
  }

  const onClickPostImg = () => {
    openModalfn()
    setIdPost(id_post)
  }
  const delpost = () => {
    fndelete(id_post)
  }

  const [openListModal, setOpenListModal] = useState(false)
  const openListModalfn = () => {
    if (!openListModal) setOpenListModal(true)
  }
  const closeListModalfn = () => {
    setOpenListModal(false)
  }

  const [openEditModal, setOpenEditModal] = useState(false)
  const openEditModalfn = () => {
    if (!openEditModal) setOpenEditModal(true)
  }
  const closeEditModalfn = () => {
    setOpenEditModal(false)
  }

  const view = () => {
    nav(`/post/${id_post}`);
  }

  const like = async ()  => {
    const token = sessionStorage.getItem("Token");
    const fetchresult = await (
      await fetch(`https://backendweb2-prueba-production.up.railway.app/api/posts/likePost/${id_post}`, {
        method: 'PUT',
        headers: {
          'x-access-token': token
        }
      })
    ).json();  
  }

  return (
    <>
      <div className="post-container" value={id_post}>
        <img onClick={onClickPostImg} className="post-image" src={srcPost} alt="post here" />
        <div>
          {
            isLocalUser == false ? <button onClick={delpost} className="btn-post" id="btn-post-del"></button> : null
          }
          {
            isLocalUser == false ? <button onClick={openEditModalfn} className="btn-post" id="btn-post-edit"></button> : null
          }
          <button onClick={view} className="btn-post" id="btn-like-post"></button>
          <button onClick={like} className="btn-post" id="btn-like-post"></button>
          <button onClick={openListModalfn} className="btn-post" id="btn-save-post"></button>
          <button className="btn-post" id="btn-fav-post"></button>
        </div>
      </div>
      <ModalPost id_post={selectedPost} openModal={openModal} onCloseFn={closeModalfn} />
      <ModalList id_post={id_post} openModal={openListModal} onCloseFn={closeListModalfn}></ModalList>
      <ModalEdit id_post={id_post} openModal={openEditModal} onCloseFn={closeEditModalfn}></ModalEdit>
    </>
  )
}

export default Post;