import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Edit from "./components/edit/Edit";
import Detail from "./components/detail/Detail";
import Error from "./components/error/Error";

import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import { loginContext } from "./components/context/ContextProvider";

import React, { useContext } from "react";

function App() {
  const [loginData, setloginData] = useContext(loginContext);

  const userType = loginData.type;

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
          <>
            <Route exact path="/view/:id" element={<Detail />} />
            <Route exact path="/*" element={<Error />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
