import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import ItemList from "../items/ItemList";
import RecipeList from "../recipe/RecipeList";
import ItemCreate from "../items/ItemCreate";
import ItemEdit from "../items/ItemEdit";
import ItemDelete from "../items/ItemDelete";

function RoutesList({ login, signup, currentUser }) {
  return (
    <Routes>
      {!currentUser && (
        <>
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route path="/signup" element={<SignupForm signup={signup} />} />
        </>
      )}

      <Route path="/" element={<Homepage />} />

      {currentUser && (
        <>
          <Route path="/items" element={<ItemList />} />
          <Route path="/items/create" element={<ItemCreate />} />
          <Route path="/items/:id/edit" element={<ItemEdit />} />
          <Route path="/items/:id/delete" element={<ItemDelete />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/profile" element={<ProfileForm />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
