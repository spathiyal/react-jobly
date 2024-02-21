import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import LoadingSpinner from "./common/LoadingSpinner";
import PantryApi from "./api/api";
import UserContext from "./auth/UserContext";
import { jwtDecode } from "jwt-decode";
import "./App.js";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "pantry-token";

/**  Pantry.
 *

 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app,
 *   infoLoaded: has user data been pulled from API?
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 *
 * App -> Routes
 */

function App() {
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false,
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwtDecode(token);
            // put the token on the Api class so it can use it to call the API.
            PantryApi.token = token;
            let currentUser = await PantryApi.getCurrentUser(username);

            setCurrentUser({
              infoLoaded: true,
              data: currentUser,
            });
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser({
              infoLoaded: true,
              data: null,
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null,
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser({
      infoLoaded: true,
      data: null,
    });
    setToken(null);
  }
  const APP_ID = "7b6c2d47";
  const APP_KEY = "af40240534cc234b22bad502cf32424f";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function to see if any error happens.
   */
  async function signup(signupData) {
    let token = await PantryApi.signup(signupData);
    setToken(token);
  }

  /** Handles site-wide login.
   *
   * Logs in a user
   *
   * Make sure you await this function to see if any error happens.
   */
  async function login(loginData) {
    let token = await PantryApi.login(loginData);
    setToken(token);
  }

  if (!currentUser.infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser,
      }}
    >
      <div className="App">
        <Navigation logout={logout} />
        <RoutesList
          currentUser={currentUser.data}
          login={login}
          signup={signup}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
