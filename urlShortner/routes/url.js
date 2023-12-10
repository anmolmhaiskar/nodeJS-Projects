const express = require("express");
const router = express.Router();
const {
  handleGetRedirectedURL,
  handleGenerateShortenedURL,
  handleGetAllURLS,
} = require("../controllers/url");

router.get("/:short_id", handleGetRedirectedURL);

router.post("/", handleGenerateShortenedURL);

router.get("/", handleGetAllURLS);


module.exports = router;