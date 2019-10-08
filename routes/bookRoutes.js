var express = require("express");
var Book = require('../models/books');
var router = express.Router();

//index

router.get("/",(req,res)=>{
    res.redirect('/home');
})
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
        image: req.body.image,
        publishedYear : req.body.publishedYear,
        genre: req.body.genre,
        description:req.body.description
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
router.get("/home/:id/edit",(req,res)=>{
   var id = req.params.id;
   Book.findById(id,(err,foundBook)=>{
       if(err){
           console.log(err);
       }else{
           res.render("edit",{book:foundBook});
       }
   })
})

//update
router.put("/home/:id",(req,res)=>{
    //find the book and then update it.
    var id = req.params.id;
   
    
    
    console.log(req.body.bookname);
    var updatedBook = {
        bookname: req.body.bookname,
        author: req.body.author,
        image: req.body.image,
        publishedYear : req.body.publishedYear,
        genre: req.body.genre,
        description: req.body.description
    }
    // res.send({status:true,updatedBook:updatedBook});
    Book.findByIdAndUpdate(id,updatedBook,(err,updatedBook)=>{
        if(err){
            console.log(err);
            console.log(updatedBook);
        }else{
            console.log({success:true,message:"Book updated!"});
            res.redirect("/home/"+id);
        }
    })

})




module.exports = router;