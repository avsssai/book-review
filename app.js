var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    bookRoutes = require("./routes/bookRoutes"),
    methodOverride = require("method-override");

mongoose.connect("mongodb://localhost:27017/bookStore",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(connected => console.log("connected to the database."))
    .catch(err=>console.log(err));

var app = express();
var PORT = 4500;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.set("view engine","ejs");

app.use(methodOverride("_method"));

app.use('/',bookRoutes);


app.listen(PORT,(req,res)=>{
    console.log("Listening on port "+ PORT);
});

