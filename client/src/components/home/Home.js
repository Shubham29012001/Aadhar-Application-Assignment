import { React, useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import "./Home.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addData,
  updateData,
  deleteUserDataContext,
} from "../context/ContextProvider";

const Home = () => {
  const [getUserData, setUserData] = useState([]);

  // Using Context Values

  const [userData, setuserData] = useContext(addData);
  const [updateUserData, setupdateUserData] = useContext(updateData);
  const [deleteUserData, setdeleteUserData] = useContext(deleteUserDataContext);

  // Get All Users Data from Backend

  const getUsersData = async (e) => {
    const res = await fetch(
      "https://aadhar-application-system.herokuapp.com/getUsersData",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

  // Delete Users in Backend

  const deleteUser = async (id) => {
    const deleteResponse = await fetch(
      `https://aadhar-application-system.herokuapp.com/deleteUser/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deleteData = await deleteResponse.json();

    if (deleteResponse.status === 201) {
      getUsersData();
      setdeleteUserData(deleteData);
    } else {
      alert("Error Occured");
    }
  };
  return (
    <>
      {userData ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{userData.first + " " + userData.last}</strong> User Added
            Successfully.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {updateUserData ? (
        <>
          <div
            class="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{updateUserData.first + " " + updateUserData.last}</strong>{" "}
            User Update Successfully.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      {deleteUserData ? (
        <>
          <div
            class="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>{deleteUserData.first + " " + deleteUserData.last}</strong>{" "}
            User Deleted Successfully.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add-btn mt-2">
            <NavLink className="btn btn-primary navlink" to="/register">
              Add Users
            </NavLink>
          </div>

          {
            // Rendering Each User Details in Table Format
          }

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
                        <NavLink to={`/view/${element._id}`}>
                          {" "}
                          <button className="btn btn-success">
                            <RemoveRedEyeIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`/edit/${element._id}`}>
                          <button className="btn btn-primary">
                            <EditIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(element._id)}
                        >
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
    </>
  );
};

export default Home;
