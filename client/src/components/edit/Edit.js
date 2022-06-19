import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importing updateContext Provider

import { updateData } from "../context/ContextProvider";

const Edit = () => {
  const history = useNavigate("");

  const [updateUserData, setupdateUserData] = useContext(updateData);

  // State to Store and Set All Input Values

  const [inputValue, setinputValue] = useState({
    first: "",
    last: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  // Set State with Each Key Press

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

  const { id } = useParams("");

  // Get Individual Data from Backend

  const getIndividualData = async () => {
    const res = await fetch(
      `https://aadhar-application-system.herokuapp.com/getIndividualData/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const dataResponse = await res.json();

    if (res.status === 201) {
      setinputValue(dataResponse);
      console.log(dataResponse);
    } else {
      alert(dataResponse.message);
      console.log(dataResponse.message);
    }
  };

  useEffect(() => {
    getIndividualData();
  }, []);

  // Update User Information in Backend

  const updateUser = async (e) => {
    e.preventDefault();

    const { first, last, dob, phone, email, password, address } = inputValue;

    const updateResponse = await fetch(
      `https://aadhar-application-system.herokuapp.com/updateUser/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first,
          last,
          dob,
          phone,
          email,
          password,
          address,
        }),
      }
    );

    const dataUpdateResponse = await updateResponse.json();
    if (updateResponse.status === 201) {
      setupdateUserData(dataUpdateResponse);
      history("/admin");
    } else {
      alert("Enter Complete Data");
    }
  };

  return (
    <div className="container mt-3 mb-4">
      <form onSubmit={updateUser}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="first" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="first"
              name="first"
              aria-describedby="firstnameHelp"
              onChange={setData}
              value={inputValue.first}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="last" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="last"
              name="last"
              aria-describedby="lastnameHelp"
              value={inputValue.last}
              onChange={setData}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              aria-describedby="dobHelp"
              name="dob"
              value={inputValue.dob}
              onChange={setData}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              aria-describedby="phonenumberHelp"
              maxLength={10}
              minLength={10}
              name="phone"
              value={inputValue.phone}
              onChange={setData}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
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
          <div className="mb-3 col-lg-6 col-md-6 col-12">
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
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Home Address
            </label>
            <textarea
              className="form-control"
              id="address"
              aria-describedby="homeaddressHelp"
              rows={2}
              name="address"
              value={inputValue.address}
              onChange={setData}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
