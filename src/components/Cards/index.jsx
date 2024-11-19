import React from "react";
import './cards.css'

const Cards = ({ticket}) => {
  return (
    <div className="card-container">
        <h2>{ticket.id}</h2>
        <h2>{ticket.title}</h2>
        <h3 className="tag">{ticket.tag}</h3>
    </div>
  )
}

export default Cards