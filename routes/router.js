const express = require("express");
const users = require("../models/userSchema");
const router = express.Router();

router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    phoneNumber,
    email,
    password,
    homeAddress,
  } = req.body;

  console.log(req.body);
  if (
    !firstName ||
    !lastName ||
    !dob ||
    !phoneNumber ||
    !email ||
    !password ||
    !homeAddress
  ) {
    res.status(422).json({ message: "Please Enter Complete Details" });
  }

  try {
    const aadharNumber = Math.floor(100000000000 + Math.random() * 9000000000);

    const preUser = await users.findOne({ phone: phoneNumber });
    const preAadhar = await users.findOne({ aadhar: aadharNumber });

    if (preUser || preAadhar) {
      res
        .status(422)
        .json({ message: "Either Phone Number or Aadhar Already Exists" });
    } else {
      const newUser = new users({
        first: firstName,
        last: lastName,
        dob: dob,
        phone: phoneNumber,
        email: email,
        password: password,
        address: homeAddress,
        aadhar: aadharNumber,
      });

      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(422).json({ message: error });
  }
});

router.get("/getUsersData", async (req, res) => {
  try {
    const userData = await users.find();
    console.log(userData);
    res.status(201).json(userData);
  } catch (error) {
    res.status(422).json({ message: error });
  }
});

router.get("/getIndividualData/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getIndividualData = await users.findById({ _id: id });
    res.status(201).json(getIndividualData);
  } catch (error) {
    res.status(422).json({ message: error });
  }
});

module.exports = router;
