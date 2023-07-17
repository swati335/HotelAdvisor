const Hotel = require("../models/hotels");
const { places, descriptors } = require("./seedhelprs");
const cities = require("./cities");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Hotel-Advisior", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDb = async () => {
  await Hotel.deleteMany({});
  for (let i = 0; i < 6; i++) {
    const rand100 = Math.floor(Math.random() * 10);
    const price = Math.floor(Math.random() * 1000);
    const camp = new Hotel({
      author: "64b293952122b46b0569a467",
      location: `${cities[rand100].city}, ${cities[rand100].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dybkhpjuu/image/upload/v1689528062/yelp-camp/zodbek7t6kx4el7rhize.jpg",
          filename: "yelp-camp/zodbek7t6kx4el7rhize",
        },
        {
          url: "https://res.cloudinary.com/dybkhpjuu/image/upload/v1689528062/yelp-camp/vn3b007mxr9qbc5wi12k.jpg",
          filename: "yelp-camp/vn3b007mxr9qbc5wi12k",
        },
      ],
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem itaque quibusdam fuga doloremque tempora soluta dicta doloribus magnam voluptates. Placeat fugiat, incidunt illo recusandae odio non. Libero repellat vel quam voluptatum temporibus fuga. Eum deserunt architecto est laudantium, excepturi rem nam natus dolor veritatis corrupti.",
      price,
    });

    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
