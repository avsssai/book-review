var express = require("express");
var Book = require('../models/books');
var router = express.Router();

//index
router.get('/home',(req,res)=>{
    Book.find({},(err,books)=>{
        if(err){
            throw err;
        }
        res.render("home",{books:books});
    })
   
});

//new
router.get('/new',(req,res)=>{
    res.render("new");
});

//create
router.post("/home",(req,res)=>{
    var newBook = {
        bookname: req.body.bookname,
        author: req.body.author,
        publishedYear : req.body.publishedYear,
        genre: req.body.genre
    }
    

    Book.create(newBook,(err,createdBook)=>{
        if(err){
            console.log(err);
        }else{
            console.log({status:true,message:"Added new Book",book:createdBook});
            res.redirect('/home');
        }
    })
    
})

//show
//showing one specific book.
//REST form --> /index/:id
router.get("/home/:id",(req,res)=>{
    var id = req.params.id;
    Book.findById(id)
        .then(foundBook=>{
            res.render('show',{book:foundBook});
        })
        .catch(err=> console.log(err));
});


//delete

//edit

//update



module.exports = router;