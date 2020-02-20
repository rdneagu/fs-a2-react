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
          <div className="section top">
            <span className="percentage">{percentage.toFixed(2)}%</span>
            <span className="info">OF FLIGHTS</span>
          </div>
          <div className="section bottom">
            <span className="action">DEPARTING TO</span>
            <span className="destination">{this.props.country.toUpperCase()}</span>
          </div>
        </div>
        <AirplaneArrow size="160"></AirplaneArrow>
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
