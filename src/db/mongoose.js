const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dejon:Smile1@cluster0-kowtm.mongodb.net/test?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    }
);






