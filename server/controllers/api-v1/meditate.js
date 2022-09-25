const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authLockedRoute = require("./authLockedRoute");

router.get("/", authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findById(res.locals.user._id).populate(
      "meditations"
    );
    const meditations = user.meditations;
    res.json(meditations);
  } catch (error) {
    console.warn(error);
    res.json("Error retrieving meditation history");
  }
});

router.post("/", authLockedRoute, async (req, res) => {
  try {
    const user = await db.User.findById(res.locals.user._id);
    console.log(user);
    const newMeditation = await db.Meditation.create({
      goals: req.body.goals,
    });
    user.meditations.push(newMeditation);
    await user.save();
    await newMeditation.save();
    res.json(newMeditation);
  } catch (error) {
    console.warn(error);
    res.json("error creating new session");
  }
});

router.put("/:id", authLockedRoute, async (req, res) => {
  try {
    const meditation = await db.Meditation.findByIdAndUpdate(
      req.params.id, // id
      req.body, // what to update
      { new: true }
    );
    res.json(meditation);
  } catch (error) {}
});

router.delete("/:id", authLockedRoute, async (req, res) => {
  try {
    const id = req.params.id;
    await db.Meditation.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
