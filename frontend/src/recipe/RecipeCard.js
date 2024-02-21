// RecipeCard.jsx

import React from "react";

const RecipeCard = ({ recipe }) => {
  console.log("inside the receipt card === ", recipe.url);
  return (
    <div>
      <button>
        <i className="fas fa-thumbs-up" />
      </button>
      <div>
        <img src={recipe.image} alt={recipe.label} />
        <div>{recipe.dishType[0]}</div>
      </div>
      <div>
        <h1>{recipe.label}</h1>
        <div>
          <span>
            <b>Ingredients:</b>
          </span>
          {recipe.ingredientLines.map((ingredient, index) => (
            <span key={index}>{ingredient}</span>
          ))}
        </div>
        <div>
          <a href={`${recipe.url}`} target="_blank" rel="noopener noreferrer">
            View Recipe
          </a>
          <div className="flex items-center text-gray-600">
            <span className="flex items-center mr-10"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
