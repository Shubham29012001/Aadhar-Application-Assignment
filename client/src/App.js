import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Edit from "./components/edit/Edit";
import Detail from "./components/detail/Detail";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/edit/:id" element={<Edit />} />
        <Route exact path="/view/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
