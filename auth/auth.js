//securing the routs

var ensureAuth = function ensuredAuthanticated(req, res, next) {
    if (req.isAuthenticated()) {
        // res.redirect("/dashboard");
        next();
    } else {
        req.flash("info", "You need to login First!!");
        res.redirect("/login");
    }
}

module.exports = { ensuredAuthanticated: ensureAuth }