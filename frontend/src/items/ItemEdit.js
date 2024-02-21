import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import PantryApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./ItemCard.css";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";
import { useParams } from "react-router-dom";

function ItemEdit() {
  let { id } = useParams();

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({});

  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfirmed] = useState(false);
  useEffect(
    function getItemsOnMount() {
      search(id);
    },
    [id]
  );

  /** Triggered by search form submit; reloads companies. */
  async function search(id) {
    let username = currentUser.username;
    let items = await PantryApi.getItems(username, id);
    const filteredResult = items.find((e) => e.id == id);
    setFormData(filteredResult);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    let itemData = {
      username: formData.username,
      itemname: formData.itemname,
      id: formData.id,
    };

    // let username = formData.username;

    let updatedItem;

    try {
      updatedItem = await PantryApi.editItem(itemData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData((f) => ({ ...f }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // setCurrentUser((currentUser) => ({
    //   ...currentUser,
    //   data: itemData.username,
    // }));
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
    <div className="height:100vh min-h-screen bg-amber-700">
      <div className="ProfileForm">
        <h3>Edit Item</h3>
        <div className="card">
          <div className="card-body  ">
            <form>
              <div className="mb-3">
                <label className="form-label">Id</label>
                <input
                  disabled
                  className="form-control"
                  placeholder={formData.id}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  disabled
                  className="form-control"
                  placeholder={formData.username}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input
                  name="itemname"
                  className="form-control"
                  value={formData.itemname}
                  onChange={handleChange}
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
                  Update Item
                </button>
                <Link to="/items/" className="btn btn-primary float-end">
                  Back to Item List
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemEdit;
