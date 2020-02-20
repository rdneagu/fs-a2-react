import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MorningFlightPanel.scss';

import PlaneSvg from '../../assets/airplane.svg';

class MorningFlightPanel extends Component {
  render() {
    // Assign the direction text depending on which data is displayed
    const text = (this.props.direction === 'outbound') ? 'OUTBOUND' : 'INBOUND';
    return (
      <aside className={`panel ${this.props.direction}`}>
        <div className="icon">
          <span className="direction">{text}</span>
          <img src={PlaneSvg} alt="plane" width="60" />
        </div>
        <div className="text">{this.props.text}</div>
        <div className="amount">{this.props.amount}</div>
      </aside>
    );
  }
}

// Prop type validation
MorningFlightPanel.propTypes = {
  direction: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default MorningFlightPanel;
