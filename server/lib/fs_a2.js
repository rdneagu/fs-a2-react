const fs = require('fs');
const xml2json = require('xml2json');
const openflights = require('openflights-cached/iata');
const _ = require('lodash');

const fs_a2 = {
  flights: {},
  /**
   * Parses the XML data file and stores the created Javascript Object into the fs_a2.flights variable
   */
  loadFlights() {
    fs.readFile('./server/data/flightdata_A.xml', (err, data) => {
      const jsonResult = xml2json.toJson(data, { object: true });
      this.flights = jsonResult.flights.flight;
    });
  },
  /**
   * Counts all the morning flights (assuming morning is between 6:00 and 12:00 AM)
   *
   * @returns {Integer}  A number representing the amount of flights
   */
  countAllMorningFlights() {
    const filteredFlights = this.flights.filter((flight) => {
      const [inDepartureHour] = flight.indeparttime.split(':');
      const [outDepartureHour] = flight.outdeparttime.split(':');

      const boolInDepartureMorning = (Number.parseInt(inDepartureHour) >= 6 && Number.parseInt(inDepartureHour) < 12);
      const boolOutDepartureMorning = (Number.parseInt(outDepartureHour) >= 6 && Number.parseInt(outDepartureHour) < 12);

      return boolInDepartureMorning || boolOutDepartureMorning;
    });
    return filteredFlights.length;
  },
  /**
   * Gets the percentage of flights getting into a specific country
   *
   * @param {String} country    The country to lookup for
   * @returns {Float}  A number representing the percentage of the flights from 0 to 1
   */
  getPercentageOfFlights(country) {
    const filteredIata = _(openflights)
      .filter((airport) => airport.country === country)
      .map((airport) => airport.iata)
      .value();
    const filteredFlights = this.flights.filter((flight) => filteredIata.indexOf(flight.destair) !== -1);
    return filteredFlights.length / this.flights.length;
  },
  /**
   * Gets a fixed list of n most popular destinations
   *
   * @param {Integer} limit     The limit of popularity list
   * @returns {Array}  The list with n most popular destinations
   */
  getMostPopularDestination(limit = 10) {
    const popularDestination = _(this.flights)
      .countBy('destair')
      .map((count, destination) => {
        const airportData = openflights[destination];
        if (!airportData) count = -1; // eslint-disable-line no-param-reassign
        return {
          count,
          destination,
          country: (airportData) ? airportData.country : 'Unknown',
          city: (airportData) ? airportData.city : 'Unknown',
          name: (airportData) ? airportData.name : 'Unknown',
        };
      })
      .orderBy('count', 'desc')
      .value();
    return popularDestination.slice(0, limit);
  },
};

fs_a2.loadFlights();

module.exports = fs_a2;
