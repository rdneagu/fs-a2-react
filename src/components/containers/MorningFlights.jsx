import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MorningFlights.scss';

import Separator from '../Separator.jsx';
import MorningFlightPanel from '../panels/MorningFlightPanel.jsx';

class MorningFlights extends Component {
  render() {
    return (
      <div className="container morning-flights">
        <span className="title">MORNING FLIGHTS (06:00 AM TO 12:00 AM)</span>
        <div className="panels">
          <MorningFlightPanel amount={this.props.data.outbound} direction="outbound" text="Flights departing to their destination"></MorningFlightPanel>
          <Separator></Separator>
          <MorningFlightPanel amount={this.props.data.inbound} direction="inbound" text="Flights returning from their destination"></MorningFlightPanel>
        </div>
      </div>
    );
  }
}

// Prop type validation
MorningFlights.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MorningFlights;
