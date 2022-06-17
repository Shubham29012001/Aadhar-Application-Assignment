import { React, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./Detail.css";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams("");

  const [getUserData, setUserData] = useState([]);

  const getIndividualData = async () => {
    const res = await fetch(`http://localhost:8080/getIndividualData/${id}`, {
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
    getIndividualData();
  }, []);

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>
        Welcome {getUserData.first + " " + getUserData.last}
      </h1>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div className="row">
            <div className="left_view col-12 col-lg-6 col-md-6">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
            </div>
            <div className="right_view col-12 col-lg-6 col-md-6">
              <div className="add_btn">
                <button className="btn btn-primary mx-2">
                  <EditIcon />
                </button>
                <button className="btn btn-danger mx-2">
                  <DeleteIcon />
                </button>
              </div>
              <h3>
                <BadgeIcon /> Name:{" "}
                <span>{getUserData.first + " " + getUserData.last}</span>
              </h3>
              <h3>
                <PhoneIphoneIcon /> Phone Number:{" "}
                <span>{getUserData.phone}</span>
              </h3>
              <h3>
                <MailOutlineIcon /> Email: <span>{getUserData.email}</span>
              </h3>
              <h3>
                <HomeIcon /> Home Address: <span>{getUserData.address}</span>
              </h3>
              <h3>
                <CreditCardIcon /> Aadhar Number:{" "}
                <span>{getUserData.aadhar}</span>
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
