import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const { image, label, cuisineType, mealType, uri } = recipe?.recipe;
  const id = uri?.split("#")[1];

  return (
    <Link to={`/recipes/${id}`} className="w-full md:w-[270px] md:h-[230px]">
      <div className="bg-_gradient shadow w-full rounded-lg overflow-hidden transition duration-300 transform hover:scale-110">
        <img
          src={image}
          alt={label}
          className="rounded-lg h-[200px] md:h-[150px] w-full object-cover"
        />

        <div className="p-3">
          <p className="text-white font-semibold">{label}</p>

          <div className="mt-2">
            {cuisineType && (
              <span className="px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500">
                {cuisineType}
              </span>
            )}
            {mealType && (
              <span className="px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500">
                {mealType}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
