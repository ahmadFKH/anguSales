const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize');
const Company = require('../dataAccess/company');

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
module.exports = router;