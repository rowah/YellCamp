const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Campground = require("./models/campground");

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

// //makes new campround through hardcoding
// app.get("/makenewcampground", async (req, res) => {
//   const camp = new Campground({
//     title: "Matangi",
//     price: 200,
//     description: "The Cheapest ever!",
//     location: "Ruiru, Nairobi",
//   });
//   await camp.save();
//   res.send(camp);
// });

//setting up different routes for campgrounds
app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  //pass through to template
  res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.Check it out!`);
});
