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
   * Converts the name of the month to a number representation ranging from 1 to 12 with 0 as not found
   *
   * @param {String} month      The name of the month
   * @returns {Integer}  A number representing the month number
   */
  getMonthNum(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(month) + 1;
  },
  /**
   * Counts all the morning flights (assuming morning is between 6:00 and 12:00 AM)
   *
   * @returns {Object}  An object containing the number of the morning flights for outbound and inbound flights
   */
  countAllMorningFlights() {
    // Reduce the array to a Javascript Object containing the required count by using a special iterator
    const countedFlights = _(this.flights)
      .reduce((acc, flight) => {
        // Split the time into an array and extract the hour from it by deconstruction
        const [outDepartureHour] = flight.outdeparttime.split(':');
        /* If the departure hour is greater or equal than 6 and lower than 12
           Default the object key to 0 if it doesn't exist and increment by 1 */
        if (Number.parseInt(outDepartureHour) >= 6 && Number.parseInt(outDepartureHour) < 12) {
          acc.outbound = (acc.outbound || 0) + 1;
        }
        // If the journey has a return flight repeat the same procedure again but for inbound flights this time
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
   * @param {String} country      The country to lookup for
   * @returns {Float}  A number representing the percentage of the flights ranging from 0 to 1
   */
  getPercentageOfFlights(country) {
    // Filter iata codes by country name to know which codes to look for
    const filteredIata = _(openflights)
      .filter((airport) => airport.country === country)
      .map((airport) => airport.iata)
      .value();
    // Filter the flights that contain one of the iata codes filtered previously then divide the length of the filtered list by the length of the unfiltered list
    const filteredFlights = this.flights.filter((flight) => filteredIata.indexOf(flight.destair) !== -1);
    return filteredFlights.length / this.flights.length;
  },
  /**
   * Gets a fixed list of n most popular destinations
   *
   * @param {Integer} limit         The limit of popularity list
   * @returns {Array}  The list with n most popular destinations
   */
  getMostPopularDestination(limit = 10) {
    // Group and count by the destination code then map the result to a new array ordered by the number of flights in descending order
    const popularDestination = _(this.flights)
      .countBy('destair')
      .map((count, destination) => {
        // Grab the airport data using the IATA code and check if the IATA code is valid to prevent errors
        const airportData = openflights[destination];
        if (!airportData) count = -1; // eslint-disable-line no-param-reassign
        // Map the object containing the count, destination and details about destination
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
    // Return a list with the destination ranging from 0 up to the limit specified (exclusive)
    return popularDestination.slice(0, limit);
  },
  /**
   * Gets the average (mean) journey time between two airports
   * The return flight of the journey is also considered but in a different key
   *
   * @param {String} departure          Departure airport iata code
   * @param {String} destination        Destination airport iata code
   * @returns {Object}  An object containing details about the airports and the average time for the outbound and inbound flights
   */
  getAvgJourneyTime(departure, destination) {
    /* Filter the journey to match our departure and destination
       Reduce the list result to a Javascript Object containing the required time difference by using a special iterator */
    const avgTimeByJourney = _(this.flights)
      .filter((flight) => flight.depair === departure && flight.destair === destination)
      .reduce((acc, flight) => {
        // Grab the outbound departure and arrival date and time then format it into a Javascript DateTime object
        const outDepartureDateTime = new Date(`${flight.outdepartdate} ${flight.outdeparttime}`);
        const outArrivalDateTime = new Date(`${flight.outarrivaldate} ${flight.outarrivaltime}`);
        // Default the object key to empty list if it does not exist and push the time differences into it
        acc.outbound = (acc.outbound || []).concat(Math.round(Math.abs(outArrivalDateTime - outDepartureDateTime) / 1000));
        // If the journey has a return flight we do the same again but for inbound flights this time
        if (flight.oneway === '0') {
          const inDepartureDateTime = new Date(`${flight.indepartdate} ${flight.indeparttime}`);
          const inArrivalDateTime = new Date(`${flight.inarrivaldate} ${flight.inarrivaltime}`);
          acc.inbound = (acc.inbound || []).concat(Math.round(Math.abs(inArrivalDateTime - inDepartureDateTime) / 1000));
        }
        return acc;
      }, {});
    return {
      departure: openflights[departure],
      destination: openflights[destination],
      averageTime: {
        outbound: _.mean(avgTimeByJourney.outbound),
        inbound: _.mean(avgTimeByJourney.inbound),
      },
    };
  },
  /**
   * Gets the number of flights per each day in a specified month and year
   *
   * @param {Integer} year            The year
   * @param {String} monthName        The name of the month
   * @returns {Object}  An object containing the number of the flights each day for outbound and inbound flights
   */
  getNumberOfFlightsPerDay(year, monthName) {
    // Convert the name of the month to a number representation
    const month = this.getMonthNum(monthName);
    // Reduce the flights list to a Javascript Object containing the required daily count by using a special iterator
    const countByDay = _(this.flights)
      .reduce((acc, flight) => {
        // Split the time into an array and extract the year, month and day from it by deconstruction
        const [outDepartureYear, outDepartureMonth, outDepartureDay] = flight.outdepartdate.split('-');
        /* If the year and the month matches with the departure
           Default the outbound object key to {} if it does not exist then increment the day key by 1 defaulting to 0 if it does not exist */
        if (Number.parseInt(outDepartureYear) === year && Number.parseInt(outDepartureMonth) === month) {
          acc.outbound = _.set(acc.outbound || {}, outDepartureDay, _.get(acc.outbound, outDepartureDay, 0) + 1);
        }
        // If the journey has a return flight repeat the same procedure again but for inbound flights this time
        if (flight.oneway === '0') {
          const [inDepartureYear, inDepartureMonth, inDepartureDay] = flight.indepartdate.split('-');
          if (Number.parseInt(inDepartureYear) === year && Number.parseInt(inDepartureMonth) === month) {
            acc.inbound = _.set(acc.inbound || {}, inDepartureDay, _.get(acc.inbound, inDepartureDay, 0) + 1);
          }
        }
        return acc;
      }, {});
    return countByDay;
  },
};

/* Load all the flights from the XML data file
 *
 * This procedure is executed only once at server startup and would not be
 * necessary if we had a database but for the sake the simplicity... */
fs_a2.loadFlights();

module.exports = fs_a2;
