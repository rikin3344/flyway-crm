var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var cookieparser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require('connect-flash');
var params = require('./params/params');
var setupPassport = require('./setuppassport');
var bodyParser = require('body-parser')
    //var routes = require("./routes");

var app = express();
mongoose.connect(params.DATABASECONNECTION);
setupPassport();

app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(session({
    secret: "scjdvuidbvdjkvid",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));


app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
})