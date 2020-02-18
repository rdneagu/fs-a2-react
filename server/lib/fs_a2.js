const fs = require('fs');
const xml2json = require('xml2json');

const fs_a2 = {
  flights: {},
  /**
   * Counts all the morning flights (assuming morning is between 6:00 and 12:00 AM)
   */
  countAllMorningFlights() {
    const filtered = this.flights.filter((flight) => {
      const [inDepartureHour] = flight.indeparttime.split(':');
      const [outDepartureHour] = flight.outdeparttime.split(':');

      const boolInDepartureMorning = (Number.parseInt(inDepartureHour) >= 6 && Number.parseInt(inDepartureHour) < 12);
      const boolOutDepartureMorning = (Number.parseInt(outDepartureHour) >= 6 && Number.parseInt(outDepartureHour) < 12);

      return boolInDepartureMorning || boolOutDepartureMorning;
    });
    return filtered.length;
  },
};

/**
 * Parses the XML data file and stores it into the fs_a2.flights variable as a Javascript Object
 */
fs.readFile('./data/flightdata_A.xml', (err, data) => {
  const jsonResult = xml2json.toJson(data, { object: true });
  fs_a2.flights = jsonResult.flights.flight;
});

module.exports = fs_a2;
