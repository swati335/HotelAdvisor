const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const hotels = require("../controllers/hotels");
const Hotel = require("../models/hotels");
const multer = require("multer");

const { storage } = require("../cloudinary");
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateHotel } = require("../middileware");

router
  .route("/")
  .get(catchAsync(hotels.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateHotel,
    catchAsync(hotels.createHotel)
  );
// .post(upload.single("image"), (req, res) => {
//   console.log(req.body, req.file);
//   res.send("It worked");
// });
router.get("/new", isLoggedIn, hotels.newForm);

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(hotels.editForm));

router
  .route("/:id")
  .get(catchAsync(hotels.showHotel))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateHotel,
    catchAsync(hotels.editHotel)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(hotels.deleteHotel));

module.exports = router;
