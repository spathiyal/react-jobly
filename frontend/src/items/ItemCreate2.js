import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import PantryApi from "../api/api";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

import { Link } from "react-router-dom";

function ItemCreate() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: currentUser.username,
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  async function handleSubmit(evt) {
    evt.preventDefault();

    let itemData = {
      username: formData.username,
      itemname: formData.itemname,
    };

    let item;

    try {
      item = await PantryApi.saveItem(itemData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData((f) => ({ ...f }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser((currentUser) => ({
      ...currentUser,
      data: item,
    }));
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
    <div className="height:100vh min-h-screen bg-amber-700 ">
      <div className="ProfileForm">
        <h3 className="text-white">Add Item </h3>
        <div className="card bg-amber-700">
          <div className="card-body bg-amber-700">
            <form>
              <div className="mb-3 bg-amber-700">
                <label className="form-label text-white">Item Name</label>
                <input
                  name="itemname"
                  className="form-control"
                  value={formData.itemname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  disabled
                  className="form-control"
                  placeholder={formData.username}
                />
              </div>

              {formErrors.length ? (
                <Alert type="danger" messages={formErrors} />
              ) : null}

              {saveConfirmed ? (
                <Alert type="success" messages={["Updated successfully."]} />
              ) : null}

              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCreate;
