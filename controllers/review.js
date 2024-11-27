const Review = require("../models/review");
const Hotel = require("../models/hotels");

module.exports.createReview = async (req, res) => {
  const hotels = await Hotel.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  hotels.reviews.push(review);
  await hotels.save();
  await review.save();
  req.flash("success", "successfully created reviews");
  res.redirect(`/hotels/${hotels._id}`);
};
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Hotel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "successfully deleted a review");
  console.log(id);
  res.redirect(`/hotels/${id}`);
};
