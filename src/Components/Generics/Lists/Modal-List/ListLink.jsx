import "./ListLink.css"

function ListLink({id, name, post}) {

  const guardarpost = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("Token");

    const DataToSend = new FormData();
    DataToSend.append("SrcId" , post.Post.Image.secure_url)
    DataToSend.append("PostId" , post.Post._id)
    DataToSend.append("PostDescription" , post.Post.DescriptionPost)
    DataToSend.append("ListId" , id)
    
    const peticion = await fetch('https://backendweb2-prueba-production.up.railway.app/api/lists/addPost', {
      method: 'PUT',
      headers: {
        'x-access-token': token
      },
      body: DataToSend
    })
      .then(res => res.json())
      .then(res => {
        if(res.success == true){
          alert("post insertado")
        }
        else{
          alert("Error al intentar insertar el post")
        }
      })
      .catch(error => {
       console.log(error)
      });

  }

  return (
    <div className="list">
      <div>
        <h3>{name}</h3>
        <p>100 guardados</p>
      </div>
      <div>
        <button onClick={guardarpost}>Guardar</button>
      </div>
    </div>
  )
}

export default ListLink