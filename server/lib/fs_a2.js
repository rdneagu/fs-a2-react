const fs = require('fs');
const xml2json = require('xml2json');

const fs_a2 = {
  flights: {},
};

/**
 * Parses the XML data file and stores it into the fs_a2.flights variable as a Javascript Object
 */
fs.readFile('./data/flightdata_A.xml', (err, data) => {
  const jsonResult = xml2json.toJson(data, { object: true });
  fs_a2.flights = jsonResult.flights.flight;
});

module.exports = fs_a2;
