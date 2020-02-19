import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MorningFlights.scss';

import PlaneSvg from '../assets/airplane.svg';

class MorningFlights extends Component {
  render() {
    return (
      <aside className={`morning-flights-${this.props.direction}`}>
        <div className="morning-flights-amount">{this.props.amount}</div>
        <div className="morning-flights-text">{this.props.text}</div>
        <img src={PlaneSvg} alt="plane" width="90"/>
      </aside>
    );
  }
}

MorningFlights.propTypes = {
  direction: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default MorningFlights;
