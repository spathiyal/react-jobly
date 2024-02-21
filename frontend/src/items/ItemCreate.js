import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import PantryApi from "../api/api";
import UserContext from "../auth/UserContext";
import "./ItemCard.css";
import { Link } from "react-router-dom";
// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";

function ItemCreate() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: currentUser.username });

  const [formErrors, setFormErrors] = useState([]);

  const [saveConfirmed, setSaveConfirmed] = useState(false);

  /** Triggered by search form submit; reloads companies. */
  async function handleSubmit(evt) {
    evt.preventDefault();

    let itemData = {
      username: formData.username,
      itemname: formData.itemname,
    };
    console.log("itemData =========", itemData);
    // let username = formData.username;

    let updatedItem;

    try {
      updatedItem = await PantryApi.saveItem(itemData);
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
        <h3>Add Item</h3>
        <div className="card">
          <div className="card-body  ">
            <form>
              <div className="mb-3">
                {/* <label className="form-label">Username</label> */}
                <input
                  disabled
                  hidden
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
                  Add Item
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

export default ItemCreate;

// import React, { useState, useContext, useEffect } from "react";
// import Alert from "../common/Alert";
// import PantryApi from "../api/api";
// import UserContext from "../auth/UserContext";

// import useTimedMessage from "../hooks/useTimedMessage";
// import { Link } from "react-router-dom";

// function ItemCreate() {
//   const { currentUser, setCurrentUser } = useContext(UserContext);
//   const [formData, setFormData] = useState({
//     username: currentUser.username,
//   });
//   //  console.log("currentUser.username === in item create", currentUser.username);
//   const [formErrors, setFormErrors] = useState([]);

//   const [saveConfirmed, setSaveConfirmed] = useState(false);
//   // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

//   async function handleSubmit(evt) {
//     evt.preventDefault();

//     let profileData = {
//       username: formData.username,
//       itemname: formData.itemname,
//     };

//     let updatedUser;

//     try {
//       updatedUser = await PantryApi.saveItem(profileData);
//     } catch (errors) {
//       setFormErrors(errors);
//       return;
//     }

//     setFormData((f) => ({ ...f }));
//     setFormErrors([]);
//     setSaveConfirmed(true);

//     // trigger reloading of user information throughout the site
//     setCurrentUser((currentUser) => ({
//       ...currentUser,
//       data: profileData.username,
//     }));
//   }
//   /** Handle form data changing */
//   function handleChange(evt) {
//     const { name, value } = evt.target;

//     setFormData((f) => ({
//       ...f,
//       [name]: value,
//     }));
//     setFormErrors([]);
//   }

//   return (
//     <div className="height:100vh min-h-screen bg-amber-700 ">
//       <div className="ProfileForm">
//         <h3 className="text-white">Add Item </h3>
//         <div className="card bg-amber-700">
//           <div className="card-body bg-amber-700">
//             <form>
//               <div>
//                 <input
//                   disabled
//                   className="form-control"
//                   placeholder={formData.username}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3 bg-amber-700">
//                 <label className="form-label text-white">Item Name</label>
//                 <input
//                   name="itemname"
//                   className="form-control"
//                   value={formData.itemname}
//                   onChange={handleChange}
//                 />
//               </div>

//               {formErrors.length ? (
//                 <Alert type="danger" messages={formErrors} />
//               ) : null}

//               {saveConfirmed ? (
//                 <Alert type="success" messages={["Updated successfully."]} />
//               ) : null}

//               <div className="d-grid">
//                 <button className="btn btn-primary" onClick={handleSubmit}>
//                   Save Changes
//                 </button>
//                 <Link to="/items/" className="btn btn-primary float-end">
//                   Back to Item List
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ItemCreate;
