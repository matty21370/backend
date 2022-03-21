const router = require('express').Router();
const Article = require('../model/article');
const Comment = require('../model/comment');

router.get("/articles", (req, res) => {
    Article.find({}, (err, articles) => {
        if(!err) {
            res.send(articles);
        } else {
            res.send(err);
        }
    });
});

router.get("/article", (req, res) => {
    Article.find({'title': {$regex: req.body.keyword}}, (err, articles) => {
        if(!err) {
            res.send(articles);
        } else {
            res.send(err);
        }
    });
});

router.post("/comment", (req, res) => {
    const comment = new Comment({
        user: req.body.user,
        article: req.body.article,
        content: req.body.content,
        upvotes: 0,
        downvotes: 0
    });

    comment.save();
    res.send(comment);
});

router.get("/comment", (req, res) => {
    Comment.find({'article': req.header('article')}, (err, comments) => {
        if(!err) {
            res.send(comments);
        } else {
            res.send(err);
        }
    });
});

router.get("/commentuser", (req, res) => {
    Comment.find({'user': req.header('user')}, (err, comments) => {
        if(!err) {
            res.send(comments);
        } else {
            res.send(err);
        }
    });
});

router.post("/upvote", (req, res) => {
    var upvotes;
    Comment.findById(req.body.id, (err, comment) => {
        if(!err) {
            upvotes = Number(comment.upvotes) + 1;

            Comment.findByIdAndUpdate(req.body.id, {'upvotes': upvotes}, (err, doc) => {
                res.send(doc);
            });
        } else {
            console.log(err);
        }
    }) 
});

router.post("/downvote", (req, res) => {
    var downvotes;
    Comment.findById(req.body.id, (err, comment) => {
        if(!err) {
            downvotes = Number(comment.downvotes) + 1;

            Comment.findByIdAndUpdate(req.body.id, {'downvotes': downvotes}, (err, doc) => {
                res.send(doc);
            });
        } else {
            console.log(err);
        }
    }) 
});

module.exports = router;