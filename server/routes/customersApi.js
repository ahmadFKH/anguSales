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
//       "email": "lula.bentley@retrotex.name",
//       "phone": "+1 (813) 463-3562"
//     },
//     {
//       "firstName": "Banks",
//       "lastName": "Coffey",
//       "company_name": "UPLINX",
//       "email": "whitehead.singleton@navir.ca",
//       "phone": "+1 (971) 461-2883"
//     },
//     {
//       "firstName": "Norman",
//       "lastName": "Horn",
//       "company_name": "KOG",
//       "email": "roberson.barrett@corpulse.us",
//       "phone": "+1 (849) 483-2079"
//     },
//     {
//       "firstName": "Alissa",
//       "lastName": "Cantrell",
//       "company_name": "KOG",
//       "email": "leanne.romero@moltonic.io",
//       "phone": "+1 (952) 470-3621"
//     },
//     {
//       "firstName": "Annette",
//       "lastName": "Hebert",
//       "company_name": "CINASTER",
//       "email": "michele.ortiz@unq.net",
//       "phone": "+1 (858) 546-3177"
//     },
//     {
//       "firstName": "Poole",
//       "lastName": "Knox",
//       "company_name": "CINASTER",
//       "email": "little.jordan@animalia.biz",
//       "phone": "+1 (810) 591-3213"
//     },
//     {
//       "firstName": "Sheila",
//       "lastName": "Barnett",
//       "company_name": "CINASTER",
//       "email": "mcclain.washington@acruex.me",
//       "phone": "+1 (990) 429-3235"
//     },
//     {
//       "firstName": "Willa",
//       "lastName": "Hartman",
//       "company_name": "TSUNAMIA",
//       "email": "susan.beasley@senmao.biz",
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