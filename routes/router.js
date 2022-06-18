const express = require("express");
const users = require("../models/userSchema");
const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await users.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(422).json({ status: "Invalid Credentials", user: false });
  }
});

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
    const type = "user";

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
        type: type,
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

router.patch("/updateUser/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const updateUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateUser);
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(422).json({ message: error });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await users.findByIdAndDelete({ _id: id });

    res.status(201).json(deleteUser);
  } catch (error) {
    res.status(422).json({ message: error });
  }
});
module.exports = router;
