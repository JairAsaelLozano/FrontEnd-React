import { useEffect, useState } from "react";
import "./GaleryCard.css"

function GaleryCard({ galeryInfo }) {

  const arreglo = galeryInfo.Images.slice(-4)
  console.log(arreglo)
  return (
    <div className="galeryCard">
      <a href={`/galery/${galeryInfo._id}`}>
        <div>
          {
            arreglo.map((elemento, indice) => (

              <img key={indice} src={elemento.secure_url} alt="alt"></img>

            ))
          }
        </div>
        <p>{galeryInfo.GaleryName}</p>
      </a>
    </div>
  )
}

export default GaleryCard