const fs = require('fs');
const express = require('express');
const xml2json = require('xml2json');

const router = express.Router();

const api = {};
/* Read the XML file and parse it into a Javascript Object */
fs.readFile('./data/flightdata_A.xml', (err, data) => {
  api.flights = xml2json.toJson(data, { object: true });
});

/* GET: /api/test endpoint */
router.get('/test', async (req, res) => {
  res.json(api.flights);
});

module.exports = router;
