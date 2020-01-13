///e-mail, name, graduated, require name and email,
//give graduated a default value

const mongoose = require("mongoose");
const User = mongoose.model("user", {
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    graduated:{
        type:Number,
        default:2020
    }
});

module.exports = User;
