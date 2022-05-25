var express = require("express");
var router = express.Router();

router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    res.locals.success = req.flash("success");
    next();
});

router.use("/", require("./home"));
router.use("/inquiry", require("./inquiry"));

module.exports = router;