var express = require("express");
var router = express.Router({mergeParams: true});
var Dog = require("../models/dog");
var Comment = require("../models/comment");
var middleware = require("../middleware/");

// New Comment

router.get("/new", middleware.isLoggedIn, function(req, res){
   Dog.findById(req.params.id, function(err, dog){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {dog: dog});
       }
   });
});

// Create Comment

router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup dog using id
    Dog.findById(req.params.id,function(err, dog){
        if (err) {
            console.log(err);
            res.redirect("/dogs");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    //save comment
                    comment.save();
                    dog.comments.push(comment);
                    dog.save();
                    req.flash("success", "Successfully added your comment!");
                    res.redirect("/dogs/" + dog._id);
                }
            });
        }
    });
});

// Edit Comment

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {dog_id: req.params.id, comment: foundComment});
        }
    });
});

// Update Comment

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/dogs/" + req.params.id);
        }
    });
});

// Delete Comment

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if (err) {
           res.redirect("back");
       } else {
           res.redirect("/dogs/" + req.params.id);
       }
   });
});

module.exports = router;