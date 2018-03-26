var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//start page
router.get("/", function(req, res){
    res.render("landing");
});

//shows sign up form
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

//creates new user
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcom to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//shows login form
router.get("/login", function(req, res) {
   res.render("login", {page: "login"}); 
});

//login logic
router.post("/login", 
passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect: "/login"}), 
function(req, res){});

//logout
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged Out");
   res.redirect("/campgrounds");
});

module.exports = router;