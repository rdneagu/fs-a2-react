import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './JourneyTime.scss';

import AirplaneArrow from '../AirplaneArrow';
import AirportData from '../AirportData';

/**
 * Computes the time in the {dd}d {hh}h {mm}m {ss}s format
 *
 * @param {Number} time         A number in seconds representing the time
 * @returns {String}  A string containing the formatted time
 */
function computeTime(time) {
  // Perform arithmetic operations to retrieve the required time information
  const days = Math.floor(time / 86400);
  const hours = Math.floor(time / 3600) % 24;
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time) % 60;

  // Format the time using template literals and only add the days if there are any days
  let strtime = `${hours}h ${minutes}m ${seconds}s`;
  strtime = (days > 0) ? `${days}d ${strtime}` : strtime;

  return strtime;
}

class JourneyTime extends Component {
  render() {
    // Compute the time for both differences into a readable format
    const outboundDifference = computeTime(this.props.data.averageTime.outbound);
    const inboundDifference = computeTime(this.props.data.averageTime.inbound);

    // Store the departure and destination into constants using object deconstruction
    const { departure, destination } = this.props.data;
    return (
      <div className="container journey-time">
        <span className="title">AVERAGE JOURNEY TIME FROM {departure.iata} TO {destination.iata}</span>
        <div className="panels">
          <div className="panel outbound">
            <AirportData data={departure}></AirportData>
            <AirplaneArrow>{outboundDifference}</AirplaneArrow>
            <AirportData data={destination}></AirportData>
          </div>
          <div className="panel inbound">
            <AirportData data={departure}></AirportData>
            <AirplaneArrow direction="left">{inboundDifference}</AirplaneArrow>
            <AirportData data={destination}></AirportData>
          </div>
        </div>
      </div>
    );
  }
}

// Prop type validation
JourneyTime.propTypes = {
  data: PropTypes.object.isRequired,
};

export default JourneyTime;
