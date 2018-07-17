const express = require('express')
const router = express.Router()
const Customer = require('../dataAccess/customer');
const Sequelize = require('sequelize');
const Comment = require('../dataAccess/comments');

router.get('/', (req, res) => {
    Comment.findAll().then(data => {
        res.send(JSON.stringify(data));
    })
});

router.get('/:email', (req, res) => {
    let customerEmail = req.params.email;
    Comment.findAll({where: {customer_email : customerEmail}})
    .then(data => {
        res.send(JSON.stringify(data));
    });
});

router.post('/add-comment', (req, res) => {
    var newComment = req.body.comment;
    Comment.create(newComment).then((data) => {
        res.send(JSON.stringify(newComment));
    });
});

router.delete('/:id', (req, res) => {
    var commentID = req.params.id;
    Comment.destroy({
        where: {
            comment_id: commentID
        }
    }).then((data) => {
        res.send(JSON.stringify(data));
    }), (err) => {
        console.error(err);
        throw err;
    }
})

  module.exports = router;