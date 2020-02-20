import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AirplaneArrow.scss';

import PlaneSvg from '../assets/airplane.svg';

class AirplaneArrow extends Component {
  render() {
    // Assign airplane direction defaulting to 'right' if undefined
    const direction = this.props.direction || 'right';
    return (
      <div className={`airplane-arrow ${direction}`}>
        <div className="line">
          <span className="line-text">{this.props.children}</span>
        </div>
        <img src={PlaneSvg} alt="plane" width="32"/>
      </div>
    );
  }
}

// Prop type validation
AirplaneArrow.propTypes = {
  children: PropTypes.string.isRequired,
  direction: PropTypes.string,
};

export default AirplaneArrow;
