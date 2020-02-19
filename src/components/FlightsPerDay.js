import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './FlightsPerDay.scss';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

class FlightsPerDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: undefined,
    };
  }

  componentDidMount() {
    const series = _(this.props.data).map((data, key) => ({ day: key, outbound: data.outbound, inbound: data.inbound })).orderBy('day', 'asc').value();

    const chart = am4core.create('flights-per-day', am4charts.XYChart);
    chart.data = series;
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'day';
    categoryAxis.title.text = 'Day of January';
    categoryAxis.tooltip.background.fill = am4core.color('#001c29');
    categoryAxis.tooltip.label.fill = am4core.color('#0af');
    categoryAxis.tooltip.background.stroke = am4core.color('#006ca2');
    categoryAxis.tooltip.background.strokeWidth = 1;
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Flights per day';
    valueAxis.tooltip.background.fill = am4core.color('#001c29');
    valueAxis.tooltip.label.fill = am4core.color('#0af');
    valueAxis.tooltip.background.stroke = am4core.color('#006ca2');
    valueAxis.tooltip.background.strokeWidth = 1;

    const outboundSeries = chart.series.push(new am4charts.ColumnSeries());
    outboundSeries.data = this.props.data.outbound;
    outboundSeries.name = 'Outbound';
    outboundSeries.columns.template.fill = am4core.color('#0af');
    outboundSeries.dataFields.valueY = 'outbound';
    outboundSeries.dataFields.categoryX = 'day';
    outboundSeries.stacked = true;
    outboundSeries.tooltipText = '{name}: [bold]{valueY}[/]';

    const inboundSeries = chart.series.push(new am4charts.ColumnSeries());
    inboundSeries.data = this.props.data.inbound;
    inboundSeries.name = 'Inbound';
    inboundSeries.columns.template.fill = am4core.color('#006ca2');
    inboundSeries.dataFields.valueY = 'inbound';
    inboundSeries.dataFields.categoryX = 'day';
    inboundSeries.stacked = true;
    inboundSeries.tooltipText = '{name}: [bold]{valueY}[/]';

    chart.cursor = new am4charts.XYCursor();

    this.setState({
      chart,
    });
  }

  componentWillUnmount() {
    if (this.state.chart) {
      this.state.chart.dispose();
    }
  }

  render() {
    return (
      <div className="flights-per-day"></div>
    );
  }
}

FlightsPerDay.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FlightsPerDay;
