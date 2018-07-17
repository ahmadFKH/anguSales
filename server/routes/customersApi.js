const express = require('express')
const router = express.Router()
const Customer = require('../dataAccess/customer');
const Sequelize = require('sequelize');
const Company = require('../dataAccess/company');
const Comment = require('../dataAccess/comments');


// let CUSTOMERS = JSON.stringify([
//     {
//       "firstName": "Heidi",
//       "lastName": "Schwartz",
//       "company_name": "TSUNAMIA",
//       "email": "heidi.schwartz@oceanica.com",
//       "phone": "(822) 471-2513"
//     },
//     {
//       "firstName": "Buchanan",
//       "lastName": "Flynn",
//       "company_name": "TSUNAMIA",
//       "email": "buchanan.flynn@quizka.tv",
//       "phone": "(907) 526-3826"
//     },
//     {
//       "firstName": "Nanette",
//       "lastName": "Mcgowan",
//       "company_name": "TSUNAMIA",
//       "email": "nanette.mcgowan@plasmosis.io",
//       "phone": "(990) 468-2024"
//     },
//     {
//       "firstName": "Phoebe",
//       "lastName": "Burns",
//       "company_name": "UPLINX",
//       "email": "phoebe.burns@strozen.biz",
//       "phone": "(938) 461-3823"
//     },
//     {
//       "firstName": "Frost",
//       "lastName": "Frank",
//       "company_name": "UPLINX",
//       "email": "frost.frank@extrawear.me",
//       "phone": "(964) 481-3219"
//     }
//   ]);
// CUSTOMERS = JSON.parse(CUSTOMERS);

// for(var i = 0; i < CUSTOMERS.length; i++) {
//     Customer.create(CUSTOMERS[i])
//     .then((data) => {
//         console.log(data);
//     }) 
//     .catch(function(err) {
//         // print the error details
//         console.error(err);
//     });
// }


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