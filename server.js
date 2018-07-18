
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const customersRoutes = require('./server/routes/customersApi');
const companiesRoutes = require('./server/routes/companiesApi');
const commentsRoutes = require('./server/routes/commentsApi');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));


// Set our api routes
app.use('/customers', customersRoutes);
app.use('/companies', companiesRoutes);
app.use('/comments', commentsRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

//const port = process.env.PORT || '3000';
const port = 'mysql://bee9b5de84e784:0576c4cb@us-cdbr-iron-east-04.cleardb.net/heroku_69dde057fe379a0?reconnect=true';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));