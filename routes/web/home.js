var express = require("express");
var passport = require("passport");
var ensuredAuthanticated = require("../../auth/auth").ensuredAuthanticated;

var router = express.Router();

router.get("/", function(req, res) {
    res.render("home/login")
});
router.get("/dashboard",
    ensuredAuthanticated,
    function(req, res) {
        res.render("home/dashboard")
    });

router.get("/login", function(req, res) {
    res.render("home/login")
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

// router.get("/inquiry/add_inquiry", ensuredAuthanticated, function(req, res) {
//     res.render("inquiry/add_inquiry");
// });

module.exports = router;