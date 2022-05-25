const { use } = require("passport");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./model/user");

module.exports = function() {
    //turn user object into id
    passport.serializeUser(function(user, done) {
        //serialize user
        done(null, user._id);
    });

    //turn the id into user object
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // local strategy 
    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "No user found!!" });
            }
            user.checkPassword(password, function(err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) { return done(null, user); } else {
                    return done(null, false, { message: "Invalid Password!!" });
                }
            });
        });
    }));
}