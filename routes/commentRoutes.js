var express = require("express");
var Comment = require('../models/comments');
var Book = require("../models/books");
var middleware = require('../middleware/index');

var router = express.Router({
    mergeParams: true
});

router.get('/new-comment', middleware.isLoggedIn, (req, res) => {
    var id = req.params.id;
    Book.findById(id)
        .then(book => {
            res.render('comments/new-comment', {
                book: book
            });

        })
        .catch(err => console.log(err));


});

router.post('/', middleware.isLoggedIn, (req, res) => {
    //find the related book
    var id = req.params.id;
    Book.findById(req.params.id)
        .then(foundBook => {
            //create a comment instance and save the comment.
            var commentText = req.body.comment;
            var comment = {
                text: commentText
            }
            if (commentText.length > 0) {
                Comment.create(comment)
                    .then(createdComment => {
                        //associate the comment owner with the logged in person id.
                        createdComment.author.id = req.user._id;
                        createdComment.author.username = req.user.username;
                        //save the created comment.
                        createdComment.save();
                        //push the comment into the array of comments in the book.
                        foundBook.comments.push(createdComment);

                        //save the book.
                        foundBook.save();
                        res.redirect('/home/' + id);



                    }).catch(err => console.log(err));
            } else {
                res.redirect("back");
            }


        })
        .catch(err => {
            console.log(err);
            res.redirect('/home');
            console.log({
                success: false,
                message: "comment creation failed!"
            });
        });
})

module.exports = router;