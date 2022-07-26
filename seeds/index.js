//file self-contained, runs independently frm the node app any time we want to run our database
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");

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

const seedDB = async () => {
  await Campground.deleteMany();
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}`,
    });
    await camp.save();
  }
};

seedDB();
