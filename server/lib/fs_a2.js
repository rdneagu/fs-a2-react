const fs = require('fs');
const xml2json = require('xml2json');
const iata = require('iata-airports');

const fs_a2 = {
  flights: {},
  iata: {},
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
   * Filters the IATA json file by removing the entries with no iata codes and stores created array into the fs_a2.iata variable
   */
  loadIATA() {
    this.iata = iata.toJSON().filter((airport) => airport.iata && airport.iata.length);
  },
  /**
   * Counts all the morning flights (assuming morning is between 6:00 and 12:00 AM)
   *
   * @returns  A number representing the amount of flights
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
   * @returns  A number representing the percentage of the flights from 0 to 1
   */
  getPercentageOfFlights(country) {
    const filteredIata = this.iata
      .filter((airport) => airport.countryName === country)
      .map((airport) => airport.iata);
    const filteredFlights = this.flights.filter((flight) => filteredIata.indexOf(flight.destair) !== -1);
    return filteredFlights.length / this.flights.length;
  },
};

fs_a2.loadFlights();
fs_a2.loadIATA();

module.exports = fs_a2;
