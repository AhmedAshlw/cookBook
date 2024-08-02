const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Food = require("../models/food");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.render("users/index.ejs", { users });
});

router.get("/:foodsId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foods = currentUser.foods.id(req.params.foodsId);
    res.render("users/show.ejs", { foods: currentUser.foods });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
