const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const { resetData } = require("./models/itemModel");

resetData((err) => {
  if (err) console.error("Error resetting data:", err.message);
  else console.log("Data reset successfully.");
});

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get("/", (req, res) => {
  res.send("Welcome to the Vercel SQLite App!");
});
app.use("/api", apiRoutes);

module.exports = app;
