var Book = require("../models/books");
var middleware = {};

middleware.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("back");
    }
}

middleware.checkBookOwnership = function(req,res,next){
    //check if the book is owned by the user serialized.
    //Book owner id has to match with the serialized user id.

    //is the user authenticated?
    if(req.isAuthenticated()){
        //find the book and see if the book's owner id matches the user id.
        console.log("checkBookOwnership hit..");
        Book.findById(req.params.id)
            .then(foundBook => {
                //is the foundBook's owner id matching with the user's id.
                if(foundBook.owner.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            })
            .catch(err=> console.log(err));
    }else{
        res.redirect("back");
    }
};

 
 middleware.checkCommentOwnership = function (req,res,next){
    //is the user logged in?
    if(req.isAuthenticated()){
        //does the user own the comment he is trying to edit or delete?
        Comment.findById(req.params.comment_id)
            .then(foundComment=>{
                if(foundComment.owner.id.equals(req.body._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            })
            .catch(err=>{
                res.redirect("back");
                console.log(err);
            })
    }
}
module.exports = middleware;