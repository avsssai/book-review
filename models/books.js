var mongoose = require("mongoose");

var bookSchema =  mongoose.Schema({

    bookname : String,
    author: String,
    image:String,
    publishedYear : Number,
    genre: String,
    description: String,
    owner : {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }    
    ]
});


var Book = module.exports = mongoose.model("Book",bookSchema);

