const Hotel = require("../models/hotels");
const { cloudinary } = require("../cloudinary");
module.exports.index = async (req, res) => {
  const hotels = await Hotel.find({});

  res.render("hotels/index", { hotels });
};

module.exports.newForm = (req, res) => {
  res.render("hotels/new");
};

module.exports.createHotel = async (req, res, next) => {
  const hotels = new Hotel(req.body.hotels);
  hotels.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  hotels.author = req.user._id;
  await hotels.save();
  console.log(hotels);
  // await hotels.save();
  req.flash("success", "successfully made a new hotel");
  res.redirect(`/hotels/${hotels._id}`);
};
module.exports.editForm = async (req, res) => {
  const { id } = req.params;

  const hotels = await Hotel.findById(id);
  if (!hotels) {
    req.flash("error", "We cannot find a hotel");
    return res.redirect("/hotels");
  }
  res.render("hotels/edit", { hotels });
};
module.exports.showHotel = async (req, res) => {
  const hotels = await Hotel.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!hotels) {
    req.flash("error", "cant find the hotel");
    res.redirect("/hotels");
  } else {
    res.render("hotels/show", { hotels });
  }
};
module.exports.editHotel = async (req, res) => {
  const { id } = req.params;
  const hotels = await Hotel.findByIdAndUpdate(id, {
    ...req.body.hotels,
  });
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  hotels.images.push(...imgs);
  await hotels.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await hotels.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "successfully updated your hotel");
  res.redirect(`/hotels/${id}`);
};
module.exports.deleteHotel = async (req, res) => {
  const { id } = req.params;
  const hotels = await Hotel.findById(id);

  await Hotel.findByIdAndDelete(id);
  req.flash("success", "successfully deleted hotel");
  res.redirect("/hotels");
};
