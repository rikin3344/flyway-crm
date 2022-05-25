var express = require("express");
var passport = require("passport");
var ensuredAuthanticated = require("../../auth/auth").ensuredAuthanticated;

var router = express.Router();

router.get("/", ensuredAuthanticated, function(req, res) {
    res.render("inquiry/inquiry");
});

router.get("/add-inquiry", ensuredAuthanticated, function(req, res) {
    res.render("inquiry/add_inquiry");
});

module.exports = router;