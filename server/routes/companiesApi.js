const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');
const Company = require('../dataAccess/company');
const Customer = require('../dataAccess/customer');


router.get('/', (req, res) => {
    Company.findAll().then(companies => {
        let myCompanies = [];
        let myData = JSON.stringify(companies);
        myData = JSON.parse(myData);
        Customer.findAll().then(customers => {
            let myCustomers = JSON.stringify(customers);
            myCustomers = JSON.parse(myCustomers);
            for (var i = 0; i < myData.length; i++) {
                var counter = 0;
                for (var k = 0; k < myCustomers.length; k++) {
                    if (myCustomers[k].company_name == myData[i].name) {
                        counter++;
                    }
                }
                let companyProfile = {
                    name: myData[i].name,
                    address: myData[i].address,
                    country: myData[i].country,
                    count: counter
                }
                myCompanies.push(companyProfile);
        }
        res.send(JSON.stringify(myCompanies));
        })
}).catch((error) => {
    console.error(error);
})
})

router.get('/:name', (req, res) => {
    let companyName = req.params.name;
    Company.find({
        where: {
            name : companyName
        }
    }).then ((data) => {
        res.send(JSON.stringify(data));
    }).catch(err => {
        console.log(err);
        throw err;
    })
})

router.post('/add-company', (req, res) => {
    var newCompany = req.body.company;
    Company.create(newCompany).then((data) => {
        res.send(JSON.stringify(data));
    })
})

module.exports = router;
