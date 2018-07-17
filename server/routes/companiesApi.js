const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');
const Company = require('../dataAccess/company');
const Customer = require('../dataAccess/customer');

// let COMPANIES = JSON.stringify([
//     {
//       "name": "UPLINX",
//       "address": "629 Friel Place, Bartley, 2043",
//       "country": "Luxembourg"
//     },
//     {
//       "name": "KOG",
//       "address": "271 Madison Street, Brady, 2220",
//       "country": "Bosnia and Herzegovina"
//     },
//     {
//       "name": "CINASTER",
//       "address": "372 Willow Place, Snowville, 7676",
//       "country": "Saint Vincent and The Grenadines"
//     },
//     {
//       "name": "TSUNAMIA",
//       "address": "408 Downing Street, Waterloo, 3261",
//       "country": "Belarus"
//     }
//   ]);

//   COMPANIES = JSON.parse(COMPANIES);

//   for(var i = 0; i < COMPANIES.length; i++) {
//     Company.create(COMPANIES[i]).then((data) => {
//         console.log(data);
//     }), (error) => {
//         console.error(error);
//     }

// }

router.get('/', (req, res) => {
    Company.findAll().then(companies => {
        let myCompanies = [];
        let myData = JSON.stringify(companies);
        myData = JSON.parse(myData);
        //console.log(myData.length);
        //var times = 0;
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
                console.log(companyProfile);
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
    //console.log("------------" + newCustomer);
    Company.create(newCompany).then((data) => {
        res.send(JSON.stringify(data));
    })
})

module.exports = router;
