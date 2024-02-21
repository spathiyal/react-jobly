// Navigation.js

import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Navigation.css";

function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);

  function loggedInNav() {
    return (
      <ul className="nav-list">
        {/* <li className="nav-item">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink
            className="text-2xl sm:text-2xl
                                   md:text-2xl lg:text-2xl
                                   font-extrabold tracking-tight text-white"
            to="/items"
          >
            Items
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="text-2xl sm:text-2xl
                                   md:text-2xl lg:text-2xl
                                   font-extrabold tracking-tight text-white"
            to="/recipes"
          >
            Recipe
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="text-2xl sm:text-2xl
                                   md:text-2xl lg:text-2xl
                                   font-extrabold tracking-tight text-white"
            to="/profile"
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <Link
            className="text-2xl sm:text-2xl
                                   md:text-2xl lg:text-1xl
                                   font-extrabold tracking-tight text-white nav-link-logout"
            to="/"
            onClick={logout}
          >
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar">
      <Link
        className="text-2xl sm:text-2xl
                                   md:text-2xl lg:text-4xl
                                   font-extrabold tracking-tight text-white"
        to="/"
      >
        My Pantry
      </Link>
      <ul className="nav-list">
        {currentUser ? loggedInNav() : loggedOutNav()}
      </ul>
    </nav>
  );
}

export default Navigation;
