var express = require("express");
var router = express.Router({mergeParams: true});
var Dog = require("../models/dog");
var Comment = require("../models/comment");
var middleware = require("../middleware/");

router.get("/", function(req, res) {
    Dog.find({}, function(err, allDogs){
        if(err){
            console.log(err);
        } else {
            res.render("dogs/index", {dogs: allDogs});
        }
    });
});

// CREATE - Add Dog to DB

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var breed = req.body.breed;
    var age = req.body.age;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newDog = {name: name, image: image, age: age, breed: breed, desc:desc, author: author};
    Dog.create(newDog, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/dogs");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("dogs/new");
});


router.get("/:id", function(req, res) {
    // find dogs with provided id
    Dog.findById(req.params.id).populate("comments").exec(function(err, foundDog){
       if(err){
           console.log(err);
       } else {
          res.render("dogs/show", {dog: foundDog});
       }
    });
});

// EDIT DOG ROUTE
router.get("/:id/edit", middleware.checkDogOwnership, function(req, res){
    Dog.findById(req.params.id, function(err, foundDog){
        res.render("dogs/edit", {dog: foundDog});    
    });
});

// UPDATE DOG ROUTE
router.put("/:id", middleware.checkDogOwnership, function(req, res){
    // find and update correct dog
    Dog.findByIdAndUpdate(req.params.id, req.body.dog, function(err, updatedDog){
        if(err) {
            console.log(err);
            res.redirect("/dogs");
        } else {
            res.redirect("/dogs/" + req.params.id);
        }
    });
    // redirect to show page
});

// DESTROY DOG ROUTE
router.delete("/:id", middleware.checkDogOwnership, function(req, res){
    Dog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/dogs");
        } else {
            res.redirect("/dogs");
        }
    });
});
module.exports = router;