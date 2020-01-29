const mongoose = require("mongoose");
const Review = mongoose.model("review", {
    movie: {
        type: String,
        required: true
    },
    reviewScore: {
        type: Number, 
        min: 1, 
        max: 5,
        required: true
    },
    reviewText: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

module.exports = Review;