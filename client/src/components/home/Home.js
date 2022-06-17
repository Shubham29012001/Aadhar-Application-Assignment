import { React, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./Home.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [getUserData, setUserData] = useState([]);
  const getUsersData = async (e) => {
    const res = await fetch("http://localhost:8080/getUsersData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataResponse = await res.json();

    if (res.status === 201) {
      setUserData(dataResponse);
      console.log(dataResponse);
    } else {
      alert(dataResponse.message);
      console.log(dataResponse.message);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add-btn mt-2">
          <NavLink className="btn btn-primary" to="/register">
            Add Users
          </NavLink>
        </div>

        <table className="table mt-5">
          <thead>
            <tr className="table-dark">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">DOB</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col">Aadhar Card</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getUserData.map((element, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.first + " " + element.last}</td>
                    <td>{element.dob}</td>
                    <td>{element.phone}</td>
                    <td>{element.email}</td>
                    <td>{element.aadhar}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`view/${element._id}`}>
                        {" "}
                        <button className="btn btn-success">
                          <RemoveRedEyeIcon />
                        </button>
                      </NavLink>
                      <NavLink to={`edit/${element._id}`}>
                        <button className="btn btn-primary">
                          <EditIcon />
                        </button>
                      </NavLink>
                      <button className="btn btn-danger">
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
