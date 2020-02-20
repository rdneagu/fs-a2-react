import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AirplaneArrow.scss';

import PlaneSvg from '../assets/airplane.svg';

class AirplaneArrow extends Component {
  render() {
    // Assign airplane direction defaulting to 'right' if undefined
    const direction = this.props.direction || 'right';
    const size = this.props.size || 32;
    return (
      <div className={`airplane-arrow ${direction}`}>
        <div className="line">
          <span className="line-text">{this.props.children}</span>
        </div>
        <img src={PlaneSvg} alt="plane" width={size} />
      </div>
    );
  }
}

// Prop type validation
AirplaneArrow.propTypes = {
  children: PropTypes.string,
  direction: PropTypes.string,
  size: PropTypes.string,
};

export default AirplaneArrow;
