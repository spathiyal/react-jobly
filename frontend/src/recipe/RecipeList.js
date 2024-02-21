import React, { useEffect, useState, useContext } from "react";
import RecipeCard from "./RecipeCard";
import style from "./RecipeCard.css";
import PantryApi from "../api/api";
import ItemCard from "../items/ItemCard";
import Checkbox from "../Checkbox";
import UserContext from "../auth/UserContext";

const RecipeList = () => {
  const APP_ID = "7b6c2d47";
  const APP_KEY = "af40240534cc234b22bad502cf32424f";
  const [food_recipes, setfood_recipes] = useState([]);
  const [search_recipe, setSearch_recipe] = useState("");
  const [search_query, setSearch_Query] = useState("chicken");
  const [items, setItems] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
  });

  useEffect(function getItemsOnMount() {
    search();
  }, []);
  async function search() {
    let username = currentUser.username;
    let items = await PantryApi.getItems();
    setItems(items);
    console.log("I am inside recipe search", items);
  }

  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { languages } = userinfo;

    console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setUserInfo({
        languages: [...languages, value],
        response: [...languages, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setUserInfo({
        languages: languages.filter((e) => e !== value),
        response: languages.filter((e) => e !== value),
      });
    }
  };
  useEffect(() => {
    getRecipesFunction();
  }, [search_query]);

  const getRecipesFunction = async () => {
    console.log("search_query ==============", search_query);
    const response = await fetch(
      `https://api.edamam.com/search?q=${search_query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    console.log("data in list", data);
    setfood_recipes(data.hits);
  };

  const updateSearchFunction = (e) => {
    setSearch_recipe(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  const getSearchFunction = (e) => {
    let recipe;
    e.preventDefault();
    {
      recipe = userinfo.response.toString();
    }
    setSearch_Query(recipe);
    // setSearch_recipe("");
  };

  async function getQuery() {
    //  let items = await PantryApi.getItems();
    // let username = currentUser.username;
    let items = await PantryApi.getItems();
    setItems(items);
  }

  return (
    <div className="img">
      <div className="bg-amber-700 min-h-screen font-sans">
        <header className="bg-amber-700 py-4 text-white">
          <div className="container mx-auto text-center">
            <h1
              className="text-3xl sm:text-4xl
            md:text-5xl lg:text-4xl
            font-extrabold tracking-tight"
            >
              <span className="block">Recipe Finder</span>
            </h1>
          </div>
        </header>
        <table>
          <tbody>
            <div className="container mx-auto mt-8 p-4 sm:px-6 lg:px-8">
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                 lg:grid-cols-6 gap-2 font-extrabold text-white"
              >
                {items.map((c, index) => [
                  <tr key={index}>
                    <input
                      className="form-check-input "
                      type="checkbox"
                      name={c.itemname}
                      value={c.itemname}
                      id="flexCheckDefault"
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      {c.itemname}
                    </label>
                    {/* <td>
                      <ItemCard itemname={c.itemname} />
                    </td>
                    <td>
                      <Checkbox itemname={c.itemname} />
                    </td> */}
                  </tr>,
                ])}
              </div>
            </div>
          </tbody>
        </table>

        <div
          className="container mx-auto mt-8 p-4
                            sm:px-6 lg:px-8"
        >
          <form
            onSubmit={getSearchFunction}
            className="bg-white p-4 sm:p-6
                               lg:p-8 rounded-lg shadow-md
                               flex flex-col sm:flex-row items-center
                               justify-center space-y-4 sm:space-y-0
                               sm:space-x-4"
          >
            <div
              className="relative justify-center flex-grow
                                    w-full sm:w-1/2"
            >
              <input
                type="text"
                name="search"
                value={userinfo.response}
                onChange={handleChange}
                placeholder="Search for recipes..."
                className="w-full py-3 px-4 bg-gray-100
                                       border border-blue-300 focus:ring-blue-500
                                       focus:border-blue-500 rounded-full
                                       text-gray-700 outline-none transition-colors
                                       duration-200 ease-in-out focus:ring-2
                                       focus:ring-blue-900 focus:bg-transparent
                                       focus:shadow-md"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-900 hover:bg-amber-600 focus:ring-2
                        focus:ring-blue-900 text-white font-semibold py-3 px-6
                        rounded-full transform hover:scale-105 transition-transform
                        focus:outline-none focus:ring-offset-2
                        focus:ring-offset-blue-700"
            >
              Search Recipe
            </button>
          </form>
        </div>

        <div className="container mx-auto mt-8 p-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                lg:grid-cols-4 gap-4 font-extrabold text-white"
          >
            {food_recipes.map((recipe) => (
              <RecipeCard key={recipe.recipe.label} recipe={recipe.recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
