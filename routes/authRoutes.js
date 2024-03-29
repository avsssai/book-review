var mongoose = require("mongoose");
var User = require("../models/user");
var express = require("express");
var passport = require('passport');
var LocalStrategy = require('passport-local');

var router = express.Router();

router.get('/register', (req, res) => {
    res.render("auth/register");
});

router.post('/register', (req, res) => {
    // User.register(new User({
    //     username: req.body.username
    // }), req.body.password, (err, user) => {
    //     if (err) {
    //         console.log(err);
    //         return res.render('register', {
    //             account: account
    //         });
    //     }
    //     passport.authenticate('local')(req, res, function () {
    //         res.redirect('/home');
    //     })
    // })
    User.register(new User({
        username: req.body.username}),
        req.body.password
        ).then(user=>{
            passport.authenticate('local')(req,res,()=>{
                req.flash("success","Registered successfully!");
                res.redirect('/home');
                
            })
        })
        .catch(err=> {
            req.flash("error",err.message);
            res.redirect('/register');
            
            console.log(err)
        });
        
});

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login',
    passport.authenticate('local', {
        successFlash:"Hey, Welcome back!",
        successRedirect: '/',
        failureFlash:true,
        failureRedirect: '/login'  
        
    }),(err,login)=>{
        if(err){
            req.flash("error","Invalid username or password.");
            console.log(err);
        }
    });

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/home');
})    
module.exports = router;