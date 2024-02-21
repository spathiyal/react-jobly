import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const centerDivStyle = {
    display: "flex",
    justifyContent: "center",

    height: "100vh",
  };
  const centerButtonStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const p = {
    fontSize: "30px",
    color: "white",
  };
  return (
    <div className="Homepage ">
      <div style={centerDivStyle}>
        {/* <h1 style={centerh1Style}>My Pantry</h1> */}

        <div>
          <div style={p}>All the recips in one, convenient place.</div>

          {currentUser ? (
            <h2 className="text-white">
              Welcome Back, {currentUser.firstName || currentUser.username}!
            </h2>
          ) : (
            <p style={centerButtonStyle}>
              <Link
                className="bg-blue-500 hover:bg-blue-600 focus:ring-2
                        focus:ring-blue-900 text-white font-semibold py-2 px-4
                        rounded-full transform hover:scale-105 transition-transform
                        focus:outline-none focus:ring-offset-2
                        focus:ring-offset-blue-700"
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="bg-blue-500 hover:bg-blue-600 focus:ring-2
                focus:ring-blue-900 text-white font-semibold py-2 px-4
                rounded-full transform hover:scale-105 transition-transform
                focus:outline-none focus:ring-offset-2
                focus:ring-offset-blue-700"
                to="/signup"
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
