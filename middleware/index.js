
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
    //currentUser in locals is the user serialized.

    //Book owner id has to match with the serialized user id.
    
}

module.exports = middleware;