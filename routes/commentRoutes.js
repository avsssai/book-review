var express = require("express");
var Comment = require('../models/comments');

var router = express.Router();

router.get('/new',(req,res)=>{
    res.send("Comment form");
});

router.post('/',(req,res)=>{
    res.send('posted to comment form!');
    // res.redirect('/home');
})

module.exports = router;
