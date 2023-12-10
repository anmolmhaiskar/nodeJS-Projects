const { restrictTo } = require("../middleware/auth");
const URL = require("../models/url");
const express = require("express");
const router = express.Router();

router.get("/signup", async (req, res) => {
    return res.render("signup");
});

router.get("/login", async (req, res) => {
    return res.render("login");
});

router.get("/admin/urls", restrictTo(["ADMIN"]), async(req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
      urls: allUrls,
    });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
    const user = req.user;
    if(!user){
        return res.redirect("/login");
    }

    const allURLS = await URL.find({
        created_by: user._id,
    });

    return res.render("home", {
        urls : allURLS,
    });
}
);

module.exports = router;