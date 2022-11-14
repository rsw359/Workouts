require("dotenv").config();

const { application } = require("express");
const express = require("express");

//express app
const app = express();

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.get("/", (req, res) => {
  res.json({ mssg: "Welcme to the app" });
});

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port 4000!");
});
