const express = require('express')
const router = express.Router()
const Customer = require('../dataAccess/customer');
const Sequelize = require('sequelize');
const Company = require('../dataAccess/company');
const Comment = require('../dataAccess/comments');


router.get('/', (req, res) => {
    Customer.findAll({ include: [Company] }).then(data => {
        //console.log(data);
        res.send(JSON.stringify(data));
    })
});

router.get('/:email', (req, res) => {
    let customerEmail = req.params.email;
    console.log('we are here' + customerEmail);
    Customer.find({ where: { email: customerEmail }, include: [Company] })
        .then(data => {
            res.send(JSON.stringify(data));
        });
})

router.get('/findByCompany/:company_name', (req, res) => {
    let customerCompany = req.params.company_name;
    console.log('we are here' + customerCompany);
    Customer.findAll({ where: { company_name: customerCompany }, include: [Company]  })
        .then(data => {
            res.send(JSON.stringify(data));
        }).catch(err => {
            console.error(err);
            throw error;
        })
})

router.post('/add-customer', (req, res) => {
    var newCustomer = req.body.customer;
    //console.log("------------" + newCustomer);
    Customer.create(newCustomer).then((data) => {
        res.send(JSON.stringify(data));
    })
});

router.delete('/:email', (req, res) => {
    var customerEmail = req.params.email;
    Comment.destroy({
        where: {
            customer_email: customerEmail
        }, include: [{
            model: Customer
        }]
    }).then((data) => {
        //console.log("data deleted:" + data);
    }), (err) => {
        console.error(err);
    }
    Customer.destroy({
        where: {
            email: customerEmail
        }
    }).then((data) => {
        //console.log("data deleted:" + data);
        res.send(JSON.stringify(data));
    }), (err) => {
        console.error(err);
    }
})

router.put('/:email', (req, res) => {
    Customer.find({
        where: {
            email: req.params.email
        }
    }).then((data) => {
        console.log(data);
        data.company_name = req.body.customer.company_name
        data.phone = req.body.customer.phone
        data.save().then((result) => {
            res.send(JSON.stringify(result));
        })
    })
})
module.exports = router;