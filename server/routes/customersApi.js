const express = require('express')
const router = express.Router()
const Customer = require('../dataAccess/customer');
const Sequelize = require('sequelize');
const Company = require('../dataAccess/company');

// let CUSTOMERS = JSON.stringify([
//     {
//       "firstName": "Ina",
//       "lastName": "Jefferson",
//       "company_name": "UPLINX",
//       "email": "ina.jefferson@undefined.co.uk",
//       "phone": "+1 (813) 463-3562"
//     },
//     {
//       "firstName": "Banks",
//       "lastName": "Coffey",
//       "company_name": "UPLINX",
//       "email": "banks.coffey@undefined.info",
//       "phone": "+1 (971) 461-2883"
//     },
//     {
//       "firstName": "Norman",
//       "lastName": "Horn",
//       "company_name": "KOG",
//       "email": "norman.horn@undefined.biz",
//       "phone": "+1 (849) 483-2079"
//     },
//     {
//       "firstName": "Alissa",
//       "lastName": "Cantrell",
//       "company_name": "KOG",
//       "email": "alissa.cantrell@undefined.tv",
//       "phone": "+1 (952) 470-3621"
//     },
//     {
//       "firstName": "Annette",
//       "lastName": "Hebert",
//       "company_name": "CINASTER",
//       "email": "annette.hebert@undefined.org",
//       "phone": "+1 (858) 546-3177"
//     },
//     {
//       "firstName": "Poole",
//       "lastName": "Knox",
//       "company_name": "CINASTER",
//       "email": "poole.knox@undefined.com",
//       "phone": "+1 (810) 591-3213"
//     },
//     {
//       "firstName": "Sheila",
//       "lastName": "Barnett",
//       "company_name": "CINASTER",
//       "email": "sheila.barnett@undefined.us",
//       "phone": "+1 (990) 429-3235"
//     },
//     {
//       "firstName": "Willa",
//       "lastName": "Hartman",
//       "company_name": "TSUNAMIA",
//       "email": "willa.hartman@undefined.ca",
//       "phone": "+1 (823) 453-2071"
//     }
//   ]);
// CUSTOMERS = JSON.parse(CUSTOMERS);

// for(var i = 0; i < CUSTOMERS.length; i++) {
//     Customer.create(CUSTOMERS[i]).then((data) => {
//         console.log(data);
//     }), (error) => {
//         console.error(error);
//     }

// }


router.get('/', (req, res) => {
    Customer.findAll({include: [Company]}).then(data => {
        console.log(data);
        res.send(JSON.stringify(data));
    })
});

router.get('/:email', (req, res) => {
    let customerEmail = req.params.email;
    console.log('we are here' + customerEmail);
    Customer.find({where: {email : customerEmail}, include:[Company]})
    .then(data => {
        res.send(JSON.stringify(data));
    });
})
module.exports = router;