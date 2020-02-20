import React from 'react';
import axios from 'axios';
import './Home.scss';

/* Components */
import Loading from '../components/Loading.jsx';
import Separator from '../components/Separator.jsx';
/* Containers */
import MorningFlights from '../components/containers/MorningFlights.jsx';
import PercentageFlights from '../components/containers/PercentageFlights.jsx';
import JourneyTime from '../components/containers/JourneyTime.jsx';
import PopularDestinations from '../components/containers/PopularDestinations.jsx';
import FlightsPerDay from '../components/containers/FlightsPerDay.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data variables to store the API response
      morningFlights: undefined,
      percentageSweden: undefined,
      popularDestinations: undefined,
      averageJourney: undefined,
      flightsPerDay: undefined,
      /* Query parameters that are sent to the server to retrieve the data
       * Feel free to play with them except the last one since the data recorded in the XML file is only for January 2018 */
      query: {
        percentageFlights: {
          country: 'Sweden',
        },
        popularDestinations: {
          limit: 10,
        },
        averageJourney: {
          departure: 'LHR',
          destination: 'DXB',
        },
        flightsPerDay: {
          year: 2018,
          month: 'January',
        },
      },
      // Default the loading screen to true until the data is loaded
      loading: true,
    };
  }

  async componentDidMount() {
    // async calls to get the data from the server
    const morningFlights = await axios.get('http://localhost:5000/api/getMorningFlights');

    const { country } = this.state.query.percentageFlights;
    const percentageFlights = await axios.get(`http://localhost:5000/api/getPercentageOfFlights?country=${country}`);

    const { limit } = this.state.query.popularDestinations;
    const popularDestinations = await axios.get(`http://localhost:5000/api/getMostPopularDestinations?limit=${limit}`);

    const { departure, destination } = this.state.query.averageJourney;
    const averageJourney = await axios.get(`http://localhost:5000/api/getAvgJourneyTime?departure=${departure}&destination=${destination}`);

    const { year, month } = this.state.query.flightsPerDay;
    const flightsPerDay = await axios.get(`http://localhost:5000/api/getNumberOfFlightsPerDay?year=${year}&month=${month}`);

    // Update the data variables after with the retrieved data and remove the loading screen
    this.setState({
      morningFlights: morningFlights.data,
      percentageFlights: percentageFlights.data,
      popularDestinations: popularDestinations.data,
      averageJourney: averageJourney.data,
      flightsPerDay: flightsPerDay.data,
      loading: false,
    });
  }

  render() {
    const isLoading = this.state.loading;
    // Container variables to store DOM elements for conditional rendering
    let headerContainer;
    let middleContainer;
    let footerContainer;
    let loading;

    // If the data has finished loading then let React display the containers
    // Else just display the loading screen
    if (!isLoading) {
      headerContainer = (
        <div className="container-wrapper header">
          <MorningFlights data={this.state.morningFlights}></MorningFlights>
        </div>
      );
      middleContainer = (
        <div className="container-wrapper middle">
          <PercentageFlights country={this.state.query.percentageFlights.country} data={this.state.percentageFlights}></PercentageFlights>
          <JourneyTime data={this.state.averageJourney}></JourneyTime>
        </div>
      );
      footerContainer = (
        <div className="container-wrapper footer">
          <PopularDestinations data={this.state.popularDestinations}></PopularDestinations>
          <Separator></Separator>
          <FlightsPerDay data={this.state.flightsPerDay} year={this.state.query.flightsPerDay.year} month={this.state.query.flightsPerDay.month}></FlightsPerDay>
        </div>
      );
    } else {
      loading = (<Loading></Loading>);
    }
    return (
      <div className="page home">
        {loading}
        {headerContainer}
        {middleContainer}
        {footerContainer}
      </div>
    );
  }
}

export default Home;
