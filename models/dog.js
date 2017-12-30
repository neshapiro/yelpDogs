var mongoose = require("mongoose");

var dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    image: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;