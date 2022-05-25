var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports = function() {
    passport.serializeUser(function(users, done) {
        done(null, users._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, users) {
            done(err, users);
        });
    });

    //local Strategy
    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function(email, password, done) {
        console.log("yser model done rikin");
        User.findOne({ email: email }, function(err, users) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!users) {
                console.log("no user");
                return done(null, false, { message: "No User Found!!" });
            }
            users.checkPassword(password, function(err, isMatch) {
                console.log("success");
                if (err) {
                    console.log(err);
                    return done(err);
                }

                if (isMatch) {
                    return done(null, users);
                } else {
                    console.log("invalid");
                    return done(null, false, { message: "Invalid Password!!" });
                }
            });
        });
    }));
}