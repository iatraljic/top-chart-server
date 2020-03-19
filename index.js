const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const chalk = require('chalk');

const db = require('./data/zadatak.json');
const TracksDAO = require('./routes/tracks');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const tracks = new TracksDAO(db);

// **************************************************************************
// **************************************************************************
// ***** TracksDAO
// **************************************************************************
// **************************************************************************

// --------------------------------------------------------------------------
// ----- /tracks/sorted
// -----
// --------------------------------------------------------------------------
app.get('/tracks/sorted/', (req, res) => {
  const { sortBy } = req.query;

  tracks.getSorted(sortBy, response => {
    res.json(response);
  });
});

// --------------------------------------------------------------------------
// ----- /tracks/:id
// -----
// --------------------------------------------------------------------------
app.get('/tracks/:id', (req, res) => {
  const { id } = req.params;

  tracks.getByID(id, response => {
    res.json(response);
  });
});

// --------------------------------------------------------------------------
// ----- /tracks
// -----
// --------------------------------------------------------------------------
app.get('/tracks/', (req, res) => {
  tracks.getAll(response => {
    res.json(response);
  });
});

// **************************************************************************
// **************************************************************************
// ***** Sve ostale requestove šalji U 404
// **************************************************************************
// **************************************************************************
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '404/index.html'));
});

// **************************************************************************
// **************************************************************************
// ***** http listener
// **************************************************************************
// **************************************************************************
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () =>
  console.log(chalk.bgGreen(`Running on localhost: ${port}`))
);
