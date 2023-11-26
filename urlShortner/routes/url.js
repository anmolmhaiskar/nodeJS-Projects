const express = require("express");
const router = express.Router();
const {
  handleGetRedirectedURL,
  handleGenerateShortenedURL,
} = require("../controllers/url");

router.get("/:short_id", handleGetRedirectedURL);

router.post("/", handleGenerateShortenedURL);


module.exports = router;