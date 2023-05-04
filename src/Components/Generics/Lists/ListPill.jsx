import "./ListPill.css"

function ListPill({listName, listState, clickfn, clickfnborrar}) {

  return (
    <>
      <div className="list-pill" onClick={clickfn}>
        <div>
          <h1>{listName}</h1>
          <p>{listState}</p>
        </div>
        <div>
          <button onClick={clickfnborrar}>Eliminar</button>
        </div>
      </div>
    </>
  )
}

export default ListPill