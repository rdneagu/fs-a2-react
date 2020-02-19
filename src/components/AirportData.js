import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AirportData.scss';

class AirportData extends Component {
  render() {
    return (
      <div className="airport-data">
        <span className="country">{this.props.data.country}</span>
        <span className="city">{this.props.data.city}</span>
        <span className="airport">{this.props.data.name} ({this.props.data.iata})</span>
      </div>
    );
  }
}

AirportData.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AirportData;
