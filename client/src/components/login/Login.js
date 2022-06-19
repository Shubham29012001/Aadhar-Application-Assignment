import React, { useState, useContext } from "react";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../context/ContextProvider";

import "./Login.css";
const Login = () => {
  const [inputValue, setinputValue] = useState({
    email: "",
    password: "",
  });

  const setData = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;

    setinputValue((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const [loginData, setloginData] = useContext(loginContext);

  const history = useNavigate("");

  const loginResponse = async (e) => {
    e.preventDefault();

    const { email, password } = inputValue;

    const res = await fetch(
      "https://aadhar-application-system.herokuapp.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const dataResponse = await res.json();

    if (res.status === 201) {
      setloginData(dataResponse);
      console.log(loginData);

      if (dataResponse.type === "user") {
        history(`/view/${dataResponse._id}`);
      } else {
        history(`/admin`);
      }
    } else {
      alert("Invalid Credentials");
    }
  };
  return (
    <>
      <div className="container col-lg-4 col-md-4 col-12 mt-5">
        <h1>
          <GroupIcon className="icon" />
          Login
        </h1>
        <form onSubmit={loginResponse}>
          <div className="form-outline mb-4">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              name="email"
              value={inputValue.email}
              onChange={setData}
            />
          </div>

          <div className="form-outline mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={inputValue.password}
              onChange={setData}
            />
          </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="checkbox"
                />
                <label className="form-check-label" htmlFor="checkbox">
                  {" "}
                  Remember me{" "}
                </label>
              </div>
            </div>

            <div className="col">
              <a href="#!">Forgot password?</a>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
