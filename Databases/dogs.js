var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelpdogs",  {useMongoClient: true});

// add dog to DB



// retrieve all cats and console log each one
Dog.find({}, function(err, dogs){
    if(err){
        console.log("We hit an error");
        console.log(err);
    } else {
        console.log("Check out our dogs!");
        console.log(dogs);
    }
})