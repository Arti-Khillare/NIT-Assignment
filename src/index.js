const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./routes/route");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_CLUSTER)
  .then(() => {
    console.log("MongoDb is successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", route);

app.listen(PORT, function () {
  console.log("Express app running on port " + PORT);
});
