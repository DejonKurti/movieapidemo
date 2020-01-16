const express = require("express");
require("./db/mongoose");  //ensures mongoose runs and connects to database
const app = express();
const movieRouter = require("./routers/movies");
const userRouter= require("./routers/user");
app.use(express.json());
app.use(movieRouter);
app.use(userRouter);
app.listen(3000, () => {
    console.log("Server up on 3000");
});


/* const jwt = require("jsonwebtoken");

const testFunction = async () => {
    const token = jwt.sign({ _id:"5e208c64e39a8e2e404d1d5c"}, "obeysudo", {
        expiresIn: "7 days"
    });
    console.log(token);
    const data = jwt.verify(token, "obeysudo");
    console.log(data);
};

testFunction(); */




