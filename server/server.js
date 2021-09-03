require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

require("./config/mongoose.config");
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/invocies.routes")(app);
require("./routes/user.routes")(app);

app.listen(process.env.PORT, () =>
  console.log("The server is running at port " + process.env.PORT + "!")
);
