import "./UserCard.css"

function UserCard({srcImg, username, postcount, id}) {
  return (
    <a href={`/profile/${id}`}>     
      <div className="userCard">
        <img src={srcImg} alt="imagen de usuario" />
        <div>{username}</div>
        <div>#{postcount} publicaciones</div>
      </div>
      </a>
  )
}

export default UserCard