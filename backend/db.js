const mongoose = require("mongoose");

const connectMongo = async() => {
 await mongoose
    .connect("mongodb://localhost:27017/goFood", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    })
    .then(console.log("MongoDb connected")
    
    )
    .catch((err) => console.log(err));
};

module.exports = connectMongo;
