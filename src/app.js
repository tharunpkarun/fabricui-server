const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const { resetData } = require("./models/itemModel");

resetData((err) => {
  if (err) console.error("Error resetting data:", err.message);
  else console.log("Data reset successfully.");
});

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.send("Welcome to the Vercel SQLite App!");
});
app.use("/api", apiRoutes);

module.exports = app;
