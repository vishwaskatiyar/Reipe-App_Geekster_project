/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Loading from "./Loading";
import Searcher from "./SearchBar";
import RecipeCard from "./RecipeCard";
import { fetchRecipes } from "../utils/index";
import Button from "./Button";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(32);
  const [loading, setLoading] = useState(false);
  const [noRecipesFound, setNoRecipesFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setNoRecipesFound(false);
  };

  const fetchRecipe = async (append = false) => {
    setLoading(true); // Set loading to true when starting fetch
    try {
      const data = await fetchRecipes({ query, limit });

      if (data.length === 0 && !append) {
        setNoRecipesFound(true);
      } else {
        setNoRecipesFound(false);
      }

      setRecipes((prevRecipes) => (append ? [...prevRecipes, ...data] : data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearchedRecipe = async (e) => {
    e.preventDefault();
    setLimit(32); // Reset the limit when searching for a new recipe
    setHasSearched(true);
    fetchRecipe();
  };

  const showMore = () => {
    setLimit((prev) => prev + 12);
    fetchRecipe(true);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center pt-10 pb-5 px-0 md:px-10">
        <form className="w-full" onSubmit={handleSearchedRecipe}>
          <Searcher
            placeholder="eg. Cake, Vegan, Chicken"
            handleInputChange={handleChange}
            rightIcon={
              <BiSearchAlt2
                className="text-gray-600"
                onClick={handleSearchedRecipe}
              />
            }
          />
        </form>
      </div>
      <>
        {recipes.length > 0 ? (
          <>
            <div className="w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10">
              {recipes.map((item, index) => (
                <RecipeCard recipe={item} key={index} />
              ))}
            </div>

            <div className="flex w-full items-center justify-center py-10">
              <Button
                title="Show More..."
                containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
                handleClick={showMore}
              />
            </div>
          </>
        ) : (
          <div className="text-white w-full items-center justify-center py-10">
            <p className="text-center">
              {hasSearched
                ? "No recipe found for your search."
                : "Search to find a recipe"}
            </p>
          </div>
        )}
      </>
      )}
    </div>
  );
};

export default Recipes;
