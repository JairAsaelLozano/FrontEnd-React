import "./PostCard.css"
import {Link} from "react-router-dom"
function PostCard({ img, title, id, imguser, usrnickname }) {

  return (
    <Link to={`/post/${id}`}>
      <div className="post-card-preview">
        <img src={img} alt="post image" />
        <div>
          <img src={imguser} alt="user image" />
          <span>{title}</span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard