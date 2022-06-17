import React, { useState } from "react";

const Register = () => {
  const [inputValue, setinputValue] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    email: "",
    password: "",
    homeAddress: "",
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

  const addUsers = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      dob,
      phoneNumber,
      email,
      password,
      homeAddress,
    } = inputValue;

    const res = await fetch("http://localhost:8080/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        dob,
        phoneNumber,
        email,
        password,
        homeAddress,
      }),
    });

    const dataResponse = await res.json();

    if (res.status === 201) {
      alert("Data Submit");
    } else {
      alert(dataResponse.message);
      console.log(dataResponse.message);
    }
  };

  return (
    <div className="container mt-3 mb-4">
      <form onSubmit={addUsers}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              aria-describedby="firstnameHelp"
              onChange={setData}
              value={inputValue.firstName}
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              aria-describedby="lastnameHelp"
              value={inputValue.lastName}
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
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              aria-describedby="phonenumberHelp"
              maxLength={10}
              minLength={10}
              name="phoneNumber"
              value={inputValue.phoneNumber}
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
            <label htmlFor="homeAddress" className="form-label">
              Home Address
            </label>
            <textarea
              className="form-control"
              id="homeAddress"
              aria-describedby="homeaddressHelp"
              rows={2}
              name="homeAddress"
              value={inputValue.homeAddress}
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

export default Register;
