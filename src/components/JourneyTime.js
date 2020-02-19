import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './JourneyTime.scss';

import AirplaneArrow from './AirplaneArrow';
import AirportData from './AirportData';

function computeTime(time) {
  const days = Math.floor(time / (60 * 60 * 24));
  const hours = Math.floor(time / 3600) % 24;
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time) % 60;

  let strtime = `${hours}h ${minutes}m ${seconds}s`;
  strtime = (days > 0) ? `${days}d ${strtime}` : strtime;

  return strtime;
}

class JourneyTime extends Component {
  render() {
    const outboundDifference = computeTime(this.props.data.averageTime.outbound);
    const inboundDifference = computeTime(this.props.data.averageTime.inbound);

    const { departure, destination } = this.props.data;
    return (
      <div className="journey-time">
        <span className="title">AVERAGE JOURNEY TIME</span>
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

JourneyTime.propTypes = {
  data: PropTypes.object.isRequired,
};

export default JourneyTime;
