var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    bookname : String,
    author: String,
    publishedYear : Number,
    genre: String
});


var Book = module.exports = mongoose.model("Book",bookSchema);

