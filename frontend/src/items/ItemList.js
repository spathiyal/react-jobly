import React, { useState, useEffect, useContext } from "react";
import SearchForm from "../common/SearchForm";
import PantryApi from "../api/api";
import ItemCard from "./ItemCard";
import LoadingSpinner from "../common/LoadingSpinner";
import "./ItemCard.css";
import Checkbox from "../Checkbox";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function ItemList() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [items, setItems] = useState(null);

  useEffect(function getItemsOnMount() {
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(id) {
    let username = currentUser.username;

    let items = await PantryApi.getItems(id, "id");

    setItems(items);
  }

  if (!items) return <LoadingSpinner />;

  return (
    <div className="bg-amber-700">
      <div className="min-h-screen font-sans">
        <header className="py-4 text-white">
          <div className="container mx-auto text-center">
            <h1
              className="text-3xl sm:text-4xl
                                 md:text-5xl lg:text-4xl
                                 font-extrabold tracking-tight"
            >
              <span className="block">Item Finder/List</span>
            </h1>
          </div>
        </header>
        <div className="CompanyList ">
          <SearchForm searchFor={search} />

          <div className="container">
            <Link
              to="/items/create"
              className="bg-amber-900 hover:bg-amber-600 focus:ring-2
                      focus:ring-blue-900 text-white font-semibold py-2 px-6
                      rounded-full transform hover:scale-105 transition-transform
                      focus:outline-none focus:ring-offset-2
                      focus:ring-offset-blue-700 float-end"
            >
              Add Item from pantry
            </Link>
          </div>

          <div className="container mx-auto text-center">
            <table className="table table-hover  bg-amber-700">
              <thead>
                <tr>
                  <th className="text-center">Id</th>
                  <th className="text-center">Item Name</th>
                  {/* <th scope="col">Selection</th> */}
                  <th className="text-center"> Edit </th>
                  <th className="text-center"> Delete </th>
                </tr>
              </thead>

              <tbody className="container mx-auto text-center ">
                {" "}
                {items.map((c, index) => [
                  <tr key={index}>
                    {" "}
                    <td>
                      <ItemCard id={c.id} />
                    </td>
                    <td>
                      <ItemCard itemname={c.itemname} />
                    </td>
                    <td>
                      <Link
                        to={`/items/${c.id}/edit`}
                        className="bg-green-500 hover:bg-amber-600 focus:ring-2
                                  focus:ring-blue-900 text-white font-semibold py-3 px-6
                                  rounded-full transform hover:scale-105 transition-transform
                                  focus:outline-none focus:ring-offset-2
                                  focus:ring-offset-blue-700"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/items/${c.id}/delete`}
                        className="bg-red-500 hover:bg-amber-600 focus:ring-2
                                  focus:ring-blue-900 text-white font-semibold py-3 px-6
                                  rounded-full transform hover:scale-105 transition-transform
                                  focus:outline-none focus:ring-offset-2
                                  focus:ring-offset-blue-700"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
