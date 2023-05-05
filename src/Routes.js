import React from "react";
import { Route, Routes } from "react-router-dom";

// Views
import Home from "./containers/Home";
import Form from "./containers/Form";

export default function MyRoutes() {

  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index path="/" element={<Home />} />
          <Route
            path="home"
            element={<Form />}
          />
          <Route
            path="form/:pokemonName" 
            element={
              <Form />
            }
          />
          <Route index path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
