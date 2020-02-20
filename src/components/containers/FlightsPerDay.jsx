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
    // Create a reference to the chart DOM
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    /* Remap the object into an array which can be used as a multi-series data in the chart
     * { day: 1, outbound: count, inbound: count } */
    const series = _(this.props.data).map((data, key) => ({ day: key, outbound: data.outbound, inbound: data.inbound })).orderBy('day', 'asc').value();

    /* Create an amChart4 chart of type XYChart using the react reference
     * and specify the flights per day list as data */
    const chart = am4core.create(this.chartRef.current, am4charts.XYChart);
    chart.data = series;
    // Insert a scrollbar on both axis to zoom in/out the chart on different segments
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarY = new am4core.Scrollbar();

    // Assign a new category set on x-axis and apply some properties
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'day';
    categoryAxis.title.text = 'Day of month';
    categoryAxis.title.fill = am4core.color('#0af');
    categoryAxis.renderer.grid.template.stroke = am4core.color('#006ca2');
    categoryAxis.renderer.labels.template.fill = am4core.color('#0af');
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.grid.template.disabled = true;
    // Disables the tooltip interaction for the categories axis
    categoryAxis.cursorTooltipEnabled = false;

    // Assign a new value set on the y-axis and aoply some properties
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Flights per day';
    valueAxis.title.fill = am4core.color('#0af');
    valueAxis.tooltip.background.fill = am4core.color('#001c29');
    valueAxis.tooltip.background.stroke = am4core.color('#006ca2');
    valueAxis.tooltip.background.strokeWidth = 1;
    valueAxis.tooltip.label.fill = am4core.color('#0af');
    valueAxis.renderer.grid.template.stroke = am4core.color('#006ca2');
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color('#0af');

    // Declare a new Column data series to represent our outbound data and apply some properties
    const outboundSeries = chart.series.push(new am4charts.ColumnSeries());
    outboundSeries.data = this.props.data.outbound;
    outboundSeries.name = 'Outbound';
    outboundSeries.columns.template.fill = am4core.color('#0af');
    outboundSeries.dataFields.valueY = 'outbound';
    outboundSeries.dataFields.categoryX = 'day';
    // Format the series as a stacked bar chart
    outboundSeries.stacked = true;
    outboundSeries.tooltipText = '{name}: [bold]{valueY}[/]';
    outboundSeries.tooltip.background.fill = am4core.color('#001c29');
    outboundSeries.tooltip.background.stroke = am4core.color('#006ca2');
    outboundSeries.tooltip.background.strokeWidth = 1;
    outboundSeries.tooltip.label.fill = am4core.color('#0af');
    outboundSeries.tooltip.getFillFromObject = false;
    outboundSeries.tooltip.autoTextColor = false;

    // Declare a new Column data series to represent our inbound data and apply some properties
    const inboundSeries = chart.series.push(new am4charts.ColumnSeries());
    inboundSeries.data = this.props.data.inbound;
    inboundSeries.name = 'Inbound';
    inboundSeries.columns.template.fill = am4core.color('#006ca2');
    inboundSeries.dataFields.valueY = 'inbound';
    inboundSeries.dataFields.categoryX = 'day';
    // Format the series as a stacked bar chart
    inboundSeries.stacked = true;
    inboundSeries.tooltipText = '{name}: [bold]{valueY}[/]';
    inboundSeries.tooltip.background.fill = am4core.color('#001c29');
    inboundSeries.tooltip.background.stroke = am4core.color('#006ca2');
    inboundSeries.tooltip.background.strokeWidth = 1;
    inboundSeries.tooltip.label.fill = am4core.color('#0af');
    inboundSeries.tooltip.getFillFromObject = false;
    inboundSeries.tooltip.autoTextColor = false;

    // Create a chart cursor for interactivity
    chart.cursor = new am4charts.XYCursor();

    // Store the chart into a class variable to dispose on unmount
    this.chart = chart;
  }

  componentWillUnmount() {
    // If chart exists, dispose of it
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div className="container flights-per-day">
        <span className="title">FLIGHTS PER DAY IN {this.props.month.toUpperCase()} {this.props.year}</span>
        <div ref={this.chartRef} className="chart"></div>
      </div>
    );
  }
}

// Prop type validation
FlightsPerDay.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default FlightsPerDay;
