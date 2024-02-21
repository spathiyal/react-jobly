// LoginForm.js

import React, { useState } from "react";
import Alert from "../common/Alert";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  /** Handle form submit */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      navigate("/companies");
    } catch (err) {
      setFormErrors(err);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  return (
    <div className="min-h-screen bg-amber-700">
      <div className="AuthForm">
        <div className="Formcontainer container bg-amber-700 ">
          <h3 className="mb-3 text-white">Log In</h3>
          <div className="card bg-amber-700">
            <div className="card-body bg-amber-700">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    name="username"
                    className="form-control form-input"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-input"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </div>

                {formErrors.length ? (
                  <Alert type="danger" messages={formErrors} />
                ) : null}

                <div className="d-grid">
                  <button
                    className="btn btn-primary form-btn"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
