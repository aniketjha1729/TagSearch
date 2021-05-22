const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

//Routes
const postRoutes = require("./routes/post");

//Intialising App
const app = express();

// Connect Database
mongoose
  .connect("mongodb://localhost/wecp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Db Connected");
  });

// Init Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defining Routes
app.use("/post", postRoutes);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
