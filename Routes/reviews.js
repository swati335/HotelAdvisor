const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Hotel = require("../models/hotels");
const review = require("../controllers/review");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middileware");
router.post("/", isLoggedIn, validateReview, catchAsync(review.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(review.deleteReview)
);

module.exports = router;
