var mongoose = require("mongoose");
var Dog = require("./models/dog");
var Comment = require("./models/comment");

var data = [
    {
        name: "Jax",
        breed: "Mutt",
        age: 5,
        image: "https://i.imgur.com/tvQolxd.jpg",
        desc: "Spicy jalapeno bacon ipsum dolor amet spare ribs pork pancetta sirloin, beef pig tri-tip pork belly. Flank tail bresaola, tri-tip porchetta frankfurter jerky tenderloin doner. Jerky tongue meatloaf, pork belly porchetta cupim picanha. Ground round tri-tip corned beef, sausage doner prosciutto ribeye bacon shank chuck."
    },
    {
        name: "Whiskey",
        breed: "Shitzu",
        age: 5,
        image: "https://i.ytimg.com/vi/iNSHAwQDxtg/hqdefault.jpg",
        desc: "Ground round brisket andouille kielbasa tail shank pastrami strip steak turducken meatball venison short loin turkey flank. Turkey ribeye pig cupim, landjaeger sausage porchetta cow rump bresaola sirloin boudin. Short loin frankfurter kevin ribeye cow turducken biltong jerky ham meatball. Alcatra shankle swine shank salami picanha, pork pastrami turkey short ribs burgdoggen tri-tip. Tri-tip shank hamburger sausage. Pork loin tenderloin filet mignon pig pork."
    },
    {
        name: "Scarlet",
        breed: "King Charles Cavalier",
        age: 2,
        image: "http://www.yourpurebredpuppy.com/dogbreeds/photos-CD/cavalierkingcharlesspanielsf2.jpg",
        desc: "Ribeye porchetta tri-tip sirloin biltong flank. Drumstick ham pancetta salami, sausage t-bone brisket sirloin corned beef bacon chicken pork loin ham hock prosciutto beef ribs. Landjaeger pork belly alcatra bresaola, turkey hamburger buffalo jerky ball tip swine bacon. Kevin venison boudin prosciutto chuck burgdoggen. Kielbasa pork loin turducken turkey porchetta kevin meatball pork chop ham fatback."
    }
]

function seedDB(){
    Dog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campground!");
        data.forEach(function(seed){
            Dog.create(seed, function(err, dog){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added campground!");
                    Comment.create({
                        text: "This dog is great, but I wish I could ride them!",
                        author: "Alinea"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            dog.comments.push(comment);
                            dog.save();
                            console.log("Created new comment")
                        }
                    });
                }
            });
        });
    });
    
}

module.exports = seedDB;