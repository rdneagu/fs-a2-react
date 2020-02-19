import React from 'react';
import axios from 'axios';

import './Home.scss';

import Separator from '../components/Separator';

import MorningFlights from '../components/MorningFlights';
import JourneyTime from '../components/JourneyTime';
import PopularDestinations from '../components/PopularDestinations';
import FlightsPerDay from '../components/FlightsPerDay';

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
    let morningFlights;
    let journeyTime;
    let splitContainer;

    if (!isLoading) {
      morningFlights = (
        <div className="morning-flights-wrapper">
          <span className="title">MORNING FLIGHTS (06:00 AM TO 12:00 AM)</span>
          <div className="panels">
            <MorningFlights amount={this.state.morningFlights.outbound} direction="outbound" text="Flights departing to their destination"></MorningFlights>
            <Separator></Separator>
            <MorningFlights amount={this.state.morningFlights.inbound} direction="inbound" text="Flights returning from their destination"></MorningFlights>
          </div>
        </div>
      );
      journeyTime = (
        <div className="average-journey-time-wrapper">
          <JourneyTime data={this.state.averageJourney}></JourneyTime>
        </div>
      );
      splitContainer = (
        <div className="split-container-wrapper">
          <div className="container-wrapper">
            <PopularDestinations data={this.state.popularDestinations}></PopularDestinations>
          </div>
          <div className="container-wrapper">
            <FlightsPerDay data={this.state.flightsPerDay}></FlightsPerDay>
          </div>
        </div>
      );
    }
    return (
      <div className="page home">
        {morningFlights}
        {journeyTime}
        {splitContainer}
      </div>
    );
  }
}

/* <div className="percentage-wrapper">
            <div className="percentage-circle">
              <span className="percentage-text">50%</span>
              <span className="percentage-info">OF FLIGHTS</span>
            </div>
          </div> */

export default Home;
