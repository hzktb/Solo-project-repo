const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log("successfully connected to the database, collection: data")
  )
  .catch((err) => console.log("Cannot connect to the database: ", err));
