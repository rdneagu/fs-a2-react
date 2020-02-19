import React from 'react';
import axios from 'axios';

import './Home.scss';

import MorningFlights from '../components/MorningFlights';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      morningFlights: undefined,
      loading: true,
    };
  }

  async componentDidMount() {
    const morningFlights = await axios.get('http://localhost:5000/api/getMorningFlights');
    const percentageSweden = await axios.get('http://localhost:5000/api/getPercentageOfFlights?country=Sweden');
    const popularDestinations = await axios.get('http://localhost:5000/api/getMostPopularDestinations?limit=10');
    const averageJourney = await axios.get('http://localhost:5000/api/getAvgJourneyTime?departure=LHR&destination=DXB');
    const flightsPerDay = await axios.get('http://localhost:5000/api/getNumberOfFlightsPerDay?year=2018&month=January');
    this.setState({
      morningFlights: morningFlights.data,
      percentageSweden: percentageSweden.data,
      popularDestinations: popularDestinations.data,
      averageJourney: averageJourney.data,
      flightsPerDay: flightsPerDay.data,
      loading: false,
    });

    console.log(this.state);
  }

  render() {
    const isLoading = this.state.loading;
    let content;

    if (!isLoading) {
      content = (
        <div className="morning-flights">
          <MorningFlights amount={this.state.morningFlights.outbound} direction="outbound" text="Flights departing to their destination"></MorningFlights>
          <MorningFlights amount={this.state.morningFlights.inbound} direction="inbound" text="Flights returning from their destination"></MorningFlights>
        </div>
      );
    }
    return (
      <div className="page home">
        {content}
      </div>
    );
  }
}

export default Home;
