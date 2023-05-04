import "./PostCard.css"

function PostCard({ img, title, id, imguser, usrnickname }) {

  return (
    <a href={`/post/${id}`}>
      <div className="post-card-preview">
        <img src={img} alt="post image" />
        <div>
          <img src={imguser} alt="user image" />
          <span>{title}</span>
        </div>
      </div>
    </a>
  )
}

export default PostCard