const express = require('express')
const router = express.Router()
const Customer = require('../dataAccess/customer');
const Sequelize = require('sequelize');
const Comment = require('../dataAccess/comments');

// let COMMENTS = JSON.stringify([
//     {
//       "comment_id": "5b221adc5a8b52a210aef172",
//       "customer_email": "lula.bentley@retrotex.name",
//       "text": "Anim sunt est sunt ipsum nulla occaecat et. Nisi exercitation fugiat eu elit. Voluptate officia cillum do veniam officia voluptate cupidatat irure commodo ipsum esse reprehenderit consequat dolore. Mollit officia mollit consectetur in. Ex proident adipisicing nulla nulla officia.",
//       "date": "Tuesday, March 3, 2015 8:25 AM"
//     },
//     {
//       "comment_id": "5b221adce7e792184a52a677",
//       "customer_email": "lula.bentley@retrotex.name",
//       "text": "Adipisicing laboris tempor nulla mollit proident ipsum reprehenderit ea magna ipsum nostrud occaecat adipisicing quis. Tempor ea occaecat adipisicing id eiusmod in esse. Quis irure deserunt esse est sint laboris adipisicing velit. Minim adipisicing aliqua qui aliqua do ea quis in. Voluptate eu labore dolor ex minim sint tempor qui laborum esse. Consequat cupidatat excepteur laboris laborum eu id tempor reprehenderit labore aliquip voluptate elit ipsum amet.",
//       "date": "Monday, March 6, 2017 4:44 PM"
//     },
//     {
//       "comment_id": "5b221adc5908a31df5a77e29",
//       "customer_email": "whitehead.singleton@navir.ca",
//       "text": "Exercitation fugiat sit non sint culpa. Aute deserunt esse excepteur officia exercitation excepteur occaecat culpa proident dolore duis. Non culpa laborum ipsum elit officia dolore quis aliquip duis pariatur adipisicing minim. Enim cupidatat proident labore mollit. Ut ullamco ullamco irure exercitation id elit est est veniam sit. Veniam quis mollit qui cupidatat consectetur aliquip mollit culpa velit cupidatat.",
//       "date": "Saturday, August 19, 2017 6:49 AM"
//     },
//     {
//       "comment_id": "5b221adc402a303a5de1326a",
//       "customer_email": "roberson.barrett@corpulse.us",
//       "text": "Elit et dolor eu tempor eiusmod reprehenderit exercitation tempor reprehenderit ullamco nulla nisi laboris cillum. Tempor officia ut esse tempor id nisi ipsum aute deserunt voluptate. Ea aliqua commodo voluptate non adipisicing et non commodo cupidatat. Ullamco esse occaecat consectetur duis.",
//       "date": "Saturday, January 3, 2015 8:25 AM"
//     },
//     {
//       "comment_id": "5b221adc8d3e0253be48e2da",
//       "customer_email": "roberson.barrett@corpulse.us",
//       "text": "In sunt sunt id ullamco ex. Sit nulla ut dolor cupidatat in velit. Voluptate qui consectetur eu tempor labore velit. Reprehenderit anim proident culpa anim proident aute ad in non consequat ex. Eu eiusmod sint ad veniam laboris cupidatat. Ullamco nisi officia amet proident non mollit elit dolore dolore aliqua velit.",
//       "date": "Monday, May 7, 2018 9:29 AM"
//     },
//     {
//       "comment_id": "5b221adc9fe46087adb5cab9",
//       "customer_email": "leanne.romero@moltonic.io",
//       "text": "Duis fugiat ullamco ut aliquip. Est nulla ex officia do eu eiusmod commodo qui. Ipsum quis ad esse laboris est cillum quis elit. Nisi id eu eu sint officia dolore ut occaecat voluptate consequat ea eiusmod adipisicing dolor.",
//       "date": "Thursday, September 1, 2016 8:46 AM"
//     },
//     {
//       "comment_id": "5b221adc6f8574dc131820fe",
//       "customer_email": "michele.ortiz@unq.net",
//       "text": "Labore aliqua do exercitation cupidatat culpa elit. Amet adipisicing eiusmod cillum reprehenderit. Cillum nostrud laboris labore qui sunt sunt laborum nisi est est. Voluptate mollit cillum veniam officia incididunt est culpa mollit sunt incididunt esse esse. Ad nostrud sint deserunt adipisicing consequat magna est reprehenderit officia aliqua laboris esse ut. Aute incididunt do proident irure magna esse dolor proident velit eu laborum consectetur.",
//       "date": "Monday, August 22, 2016 6:37 AM"
//     },
//     {
//       "comment_id": "5b221adc3514b9c9cad60ef3",
//       "customer_email": "michele.ortiz@unq.net",
//       "text": "Minim consectetur commodo cupidatat laborum id cupidatat culpa labore fugiat veniam laborum aliquip Lorem. Eu ea ea nulla eu commodo cillum dolor est ad enim amet veniam. Est pariatur nisi laborum culpa occaecat aliqua excepteur ipsum aliqua excepteur quis irure minim. Anim quis consequat reprehenderit laborum. Laborum enim esse ipsum voluptate dolore culpa voluptate. Mollit esse ipsum officia sunt dolor enim mollit officia exercitation fugiat.",
//       "date": "Thursday, July 16, 2015 3:05 AM"
//     },
//     {
//       "commet_id": "5b221adc6c28b30902388649",
//       "customer_email": "little.jordan@animalia.biz",
//       "text": "Elit officia duis aliquip eiusmod laborum ad cupidatat elit velit enim cillum occaecat nulla. Esse consequat amet fugiat irure dolor minim ut laborum ex consectetur ullamco ipsum. Consequat magna anim magna magna enim laborum magna aute minim dolor. Cillum laborum ea anim enim eiusmod in fugiat qui quis labore quis laborum esse magna.",
//       "date": "Thursday, March 13, 2014 10:57 PM"
//     },
//     {
//       "comment_id": "5b221adcc094f2caa877a3c2",
//       "customer_email": "susan.beasley@senmao.biz",
//       "text": "Excepteur cupidatat consequat fugiat ut. Excepteur sint proident sint irure pariatur commodo nostrud consequat occaecat laborum quis irure. Et ipsum amet nostrud qui occaecat sunt. Culpa ad culpa enim nostrud laborum exercitation ad sint eu sint ad non.",
//       "date": "Friday, July 3, 2015 5:56 PM"
//     },
//     {
//       "comment_id": "5b221adc78d743b843190746",
//       "customer_email": "mcclain.washington@acruex.me",
//       "text": "Dolore nisi in ea cupidatat consectetur ea laboris irure ipsum reprehenderit. Lorem velit adipisicing nulla esse occaecat et nulla consectetur eiusmod occaecat ullamco consequat elit ex. Exercitation tempor ut culpa est. Sit reprehenderit excepteur ipsum consectetur.",
//       "date": "Sunday, October 25, 2015 12:22 AM"
//     }
//   ]);

//   COMMENTS = JSON.parse(COMMENTS);

// for(var i = 0; i < COMMENTS.length; i++) {
//     Comment.create(COMMENTS[i]).then((data) => {
//         console.log(data);
//     }), (error) => {
//         console.error(error);
//     }

// }

router.get('/', (req, res) => {
    Comment.findAll().then(data => {
        console.log(data);
        res.send(JSON.stringify(data));
    })
});

router.get('/:email', (req, res) => {
    let customerEmail = req.params.email;
    Comment.find({where: {customer_email : customerEmail}})
    .then(data => {
        res.send(JSON.stringify(data));
    });
});

  module.exports = router;