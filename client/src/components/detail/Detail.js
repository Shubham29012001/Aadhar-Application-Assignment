import { React, useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Detail.css";

// Importing All Material UI Icons

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import { useParams, NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

// Importing Login Context

import { loginContext } from "../context/ContextProvider";

const Detail = () => {
  const { id } = useParams("");

  const [loginData, setloginData] = useContext(loginContext);

  // Storing Value of LoggedIn User ID for Future Reference

  const userLoginID = loginData._id;

  const history = useNavigate("");
  const [getUserData, setUserData] = useState([]);
  const [getID, setID] = useState("");

  // Get Individual User Data Details from Backend

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
      setUserData(dataResponse);
      console.log(dataResponse);
    } else {
      console.log(dataResponse.message);
    }
  };

  useEffect(() => {
    getIndividualData();
    setID(userLoginID);
  }, []);

  // Delete User Details in Backend from Detail Page Icon

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
      alert("Data Deleted Successfully");
      history("/");
    } else {
      alert("Error Occured");
    }
  };

  // Return the User Details if ID gets Matched with loginContext ID value else Show Unauthorized Access

  if (getID === id) {
    return (
      <div className="container mt-3">
        <h1 style={{ fontWeight: 400 }}>
          Welcome {getUserData.first + " " + getUserData.last}
        </h1>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275, maxWidth: 700 }}>
              <CardContent>
                <div className="row">
                  <div className="right_view col-12 col-lg-12 col-md-12">
                    {loginData.type === "admin" && (
                      <div className="add_btn">
                        <NavLink to={`/edit/${getUserData._id}`}>
                          <button className="btn btn-primary mx-2">
                            <EditIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteUser(getUserData._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    )}
                    <h3>
                      <BadgeIcon /> Name:{" "}
                      <span>{getUserData.first + " " + getUserData.last}</span>
                    </h3>
                    <h3>
                      <PhoneIphoneIcon /> Phone Number:{" "}
                      <span>{getUserData.phone}</span>
                    </h3>
                    <h3>
                      <MailOutlineIcon /> Email:{" "}
                      <span>{getUserData.email}</span>
                    </h3>
                    <h3>
                      <HomeIcon /> Home Address:{" "}
                      <span>{getUserData.address}</span>
                    </h3>
                    <h3>
                      <CreditCardIcon /> Aadhar Number:{" "}
                      <span>{getUserData.aadhar}</span>
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <h1>Unauthorized Access</h1>;
  }
};

export default Detail;
