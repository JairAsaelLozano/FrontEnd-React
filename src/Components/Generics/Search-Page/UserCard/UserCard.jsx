import "./UserCard.css"
import { Link } from 'react-router-dom'

function UserCard({ srcImg, username, postcount, id }) {
  return (
    <Link href={`/profile/${id}`}>
      <div className="userCard">
        <img src={srcImg} alt="imagen de usuario" />
        <div>{username}</div>
        <div>#{postcount} publicaciones</div>
      </div>
    </Link>
  )
}

export default UserCard