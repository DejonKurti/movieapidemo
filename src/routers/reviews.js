const express = require("express");
const Review = require("../models/review");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/reviews/me", auth, async(req, res) => {
    try {
      await req.user.populate("reviews").execPopulate();
      res.send(req.user.reviews);
    } catch (error) {
      res.send(error);
    }
  });

router.get("/reviews/:id", async (req, res) => {
    const review = req.params.id;
    try {
        let review = await Review.findById(req.params.id);
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/reviews", auth, async (req, res) => {
    const review = new Review({
        ...req.body,
        owner: req.user._id
    });
    try {
        await review.save();
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/reviews/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["genre"];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update)
    );
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body);
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete("/reviews/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;