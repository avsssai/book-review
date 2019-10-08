var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    bookname : String,
    author: String,
    image:String,
    publishedYear : Number,
    genre: String,
    description: String
});


var Book = module.exports = mongoose.model("Book",bookSchema);

