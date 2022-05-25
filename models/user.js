var express = require("express");
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
const passport = require("passport");
const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
    username: { type: String, require: true },
    fullname: { type: String, require: true },
    mobile: { type: String, require: true },
    status: { type: String, require: true },
    branch: { type: String, require: true },
    dob: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    createdBy: { type: String, require: true },
    createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function(done) {
    var users = this;
    if (!users.isModified("password")) {
        console.log("yser model done");
        return done();
    }

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            console.log("yser model  err 1");
            return done(err);
        }
        bcrypt.hash(users.password, salt, function(err, saltedPassword) {
            if (err) {
                console.log("yser model err 2");
                return done(err);
            }
            users.password = saltedPassword;
            console.log("saltedPassword");
            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done) {
    if (this.password != null) {
        bcrypt.compare(guess, this.password, function(err, isMatch) {
            done(err, isMatch);
        });
    }
}

var User = mongoose.model("User", userSchema);

module.exports = User;