import { useEffect, useState } from "react";
import "./GaleryCard.css"
import { Link } from 'react-router-dom'

function GaleryCard({ galeryInfo }) {

  const arreglo = galeryInfo.Images.slice(-4)

  return (
    <div className="galeryCard">
      <Link href={`/galery/${galeryInfo._id}`}>
        <div>
          {
            arreglo.map((elemento, indice) => (

              <img key={indice} src={elemento.secure_url} alt="alt"></img>

            ))
          }
        </div>
        <p>{galeryInfo.GaleryName}</p>
      </Link>
    </div>
  )
}

export default GaleryCard