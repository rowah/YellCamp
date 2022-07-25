const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

//connects mongodb and passes in options to prevent yelling
mongoose.connect("mongodb://localhost:27017/yell-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//checks errors in db connections and alerts error or successful opening
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error!"));
db.once("open", () => {
  console.log(`Database Connected!!!`);
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render(`home`);
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.Check it out!`);
});
