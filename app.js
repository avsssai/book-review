var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    bookRoutes = require("./routes/bookRoutes"),
    authRoutes = require("./routes/authRoutes"),
    commentRoutes = require("./routes/commentRoutes"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    User = require('./models/user'),
    Comment = require('./models/comments');


mongoose.connect("mongodb://localhost:27017/bookReview",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    .then(connected => console.log("connected to the database."))
    .catch(err=>console.log(err));

var app = express();

app.set("trust proxy",1);
app.use(session({
    secret:"shiva",
    resave:false,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

var PORT = 4500;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.set("view engine","ejs");

app.use(methodOverride("_method"));

app.use('/',bookRoutes);
app.use('/',authRoutes);
app.use('/home/:id',commentRoutes);

//locals middleware.


app.listen(PORT,(req,res)=>{
    console.log("Listening on port "+ PORT);
});

