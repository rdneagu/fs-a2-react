import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MorningFlights.scss';

import PlaneSvg from '../assets/airplane.svg';

class MorningFlights extends Component {
  render() {
    const text = (this.props.direction === 'outbound') ? 'OUTBOUND' : 'INBOUND';
    return (
      <aside className={this.props.direction}>
        <div className="icon">
          <span className="direction">{text}</span>
          <img src={PlaneSvg} alt="plane" width="60"/>
        </div>
        <div className="text">{this.props.text}</div>
        <div className="amount">{this.props.amount}</div>
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
