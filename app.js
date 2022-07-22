const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render(`home`);
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.Check it out!`);
});
