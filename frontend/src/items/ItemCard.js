// CompanyCard.js

import React from "react";

import { Link } from "react-router-dom";
import "./ItemCard.css";

function ItemCard({ id, itemname }) {
  return (
    <Link to={`/items/`}>
      <div>
        <h6 className="text-white"> {id}</h6>
      </div>
      <div>
        <h6 className="text-white">{itemname}</h6>
      </div>
    </Link>
  );
}

export default ItemCard;
