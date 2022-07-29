const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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

//req.body in form submission is empty despite being sent back, the body is not parsed. Req has to be told to parse the body (bodyparser)
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

//creates route to add a new campground through a form action...serviing the form as a get request // form action is a POST
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

//sets up the endpoint as a post where the form is submitted to
app.post("/campgrounds", async (req, res) => {
  //req.send(req.body);

  //create new campround and redirect to the new campground
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});
//order matters

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}.Check it out!`);
});
