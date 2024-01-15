// CompanyCard.js

import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ name, description, logoUrl, handle }) {
  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h6 className="card-title">{name}</h6>
            <p>
              <small>{description}</small>
            </p>
          </div>
          {logoUrl && (
            <div className="col-md-4 text-end">
              <img src={logoUrl} alt={name} />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CompanyCard;
