///e-mail, name, graduated, require name and email,
//give graduated a default value

/* const mongoose = require("mongoose");
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
 */


   
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot "password" ');
      }
    }
  },
  graduated: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 7);
  }
  next();
});
//when we send a post or patch request, then bcrypt will run BEFORE the user password is saved to the mongo object.

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error("unable to login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)  { 
        throw new Error("incorrect password");
    }
    return user;
};
const User = mongoose.model("User", userSchema);
module.exports = User;      