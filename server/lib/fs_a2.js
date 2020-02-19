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

      this.countAllMorningFlights();
    });
  },
  /**
   * Counts all the morning flights (assuming morning is between 6:00 and 12:00 AM)
   *
   * @returns {Object}  An object containing the number of the morning flights for outbound and inbound flights
   */
  countAllMorningFlights() {
    const countedFlights = _(this.flights)
      .reduce((acc, flight) => {
        const [outDepartureHour] = flight.outdeparttime.split(':');
        if (Number.parseInt(outDepartureHour) >= 6 && Number.parseInt(outDepartureHour) < 12) {
          acc.outbound = (acc.outbound || 0) + 1;
        }
        if (flight.oneway === '0') {
          const [inDepartureHour] = flight.indeparttime.split(':');
          if (Number.parseInt(inDepartureHour) >= 6 && Number.parseInt(inDepartureHour) < 12) {
            acc.inbound = (acc.inbound || 0) + 1;
          }
        }
        return acc;
      }, {});
    return countedFlights;
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
  /**
   * Gets the average (mean) journey time between two airports
   * If the flight has a return then we consider that time as well
   *
   * @param {String} departure      Departure airport iata code
   * @param {String} destination    Destination airport iata code
   * @returns {Object}  An object containing details about the airports and the average time
   */
  getAvgJourneyTime(departure, destination) {
    const avgTimeByJourney = _(this.flights)
      .filter((flight) => flight.depair === departure && flight.destair === destination)
      .map((flight) => {
        const outDepartureDateTime = new Date(`${flight.outdepartdate} ${flight.outdeparttime}`);
        const outArrivalDateTime = new Date(`${flight.outarrivaldate} ${flight.outarrivaltime}`);
        
        const difference = [Math.round(Math.abs(outArrivalDateTime - outDepartureDateTime) / 1000)];
        if (flight.oneway === '0') {
          const inDepartureDateTime = new Date(`${flight.indepartdate} ${flight.indeparttime}`);
          const inArrivalDateTime = new Date(`${flight.inarrivaldate} ${flight.inarrivaltime}`);

          difference.push(Math.round(Math.abs(inArrivalDateTime - inDepartureDateTime) / 1000))
        }
        return difference;
      })
      .flattenDeep()
      .mean();
    return {
      departure: openflights[departure],
      destination: openflights[destination],
      avgTime: avgTimeByJourney,
    };
  },
};

fs_a2.loadFlights();

module.exports = fs_a2;
