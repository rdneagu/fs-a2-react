import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PercentageFlights.scss';

import AirplaneArrow from '../AirplaneArrow';

class PercentageFlights extends Component {
  render() {
    // Convert the percentage data into readable percentage
    const percentage = this.props.data.percentage * 100;
    return (
      <div className="container percentage-flights">
        <div className="circle">
          <span className="text">{percentage.toFixed(2)}%</span>
          <span className="info">OF FLIGHTS</span>
        </div>
        <div className="destination">
          <AirplaneArrow></AirplaneArrow>
          <div className="country">{this.props.country}</div>
        </div>
      </div>
    );
  }
}

// Prop type validation
PercentageFlights.propTypes = {
  country: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default PercentageFlights;
