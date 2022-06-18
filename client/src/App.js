import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";

// Importing Boostrap Min Files

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

// Importing All Components

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Edit from "./components/edit/Edit";
import Detail from "./components/detail/Detail";
import Error from "./components/error/Error";
import Login from "./components/login/Login";

// Importing Routes and Context

import { Route, Routes } from "react-router-dom";
import { loginContext } from "./components/context/ContextProvider";

function App() {
  const [loginData, setloginData] = useContext(loginContext);

  const userType = loginData.type;

  /* Allowing Admin Users Only to Access Admin, Edit and Register
    Component, Normal Users to access View Component and Error Components
    for All Other Pages
  */

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />

        {userType === "admin" ? (
          <>
            <Route exact path="/admin" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/edit/:id" element={<Edit />} />
          </>
        ) : (
          <></>
        )}
        <Route exact path="/view/:id" element={<Detail />} />
        <Route exact path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
