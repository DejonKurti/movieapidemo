/* const express = require("express");
const User = require("../models/user");
const router = new express.Router();

router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/users", async (req, res) => {
    try {
        let users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/users/:id", async (req, res) => { 
    try {
        let user = await User.findOne("Dejon");
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/users/:id", async (req, res) => {
    try  {
        const user = await User.findByIdAndDelete(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

 */


const express = require("express");
const User = require("../models/user");

const router = new express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateToken(); //lowercase "token" so that token is generated for only this user
    res.send({user, token});
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
    console.log(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users/me", auth, async(req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  try {
    let user = await User.findyyId(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;