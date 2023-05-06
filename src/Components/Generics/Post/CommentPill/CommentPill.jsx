import "./CommentPill.css"

function CommentPill({commentContent, img, user, isOwner }) {
  return (
    <>
      <div className="comment-pill">
        <div className="user-info">
          <img src={img} alt="user-img" />
          <span>{user}</span>
          {/* {isOwner ? <button>Editar</button> : null} */}
        </div>
        <span>{commentContent}</span>
      </div>
    </>
  )
}

export default CommentPill