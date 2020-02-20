import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PopularDestinations.scss';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

class PopularDestinations extends Component {
  constructor(props) {
    super(props);
    // Create a reference to the chart DOM
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    /* Create an amChart4 chart of type XYChart using the react reference
     * and specify the popular destinations list as data in reversed order */
    const chart = am4core.create(this.chartRef.current, am4charts.XYChart);
    chart.data = this.props.data.list.reverse();

    // Assign a new category set on the y-axis and apply some properties
    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'city';
    categoryAxis.title.text = 'City';
    categoryAxis.title.fill = am4core.color('#0af');
    categoryAxis.renderer.grid.template.stroke = am4core.color('#006ca2');
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.fill = am4core.color('#0af');
    // Disables the tooltip interaction for the categories axis
    categoryAxis.cursorTooltipEnabled = false;

    // Assign a new value set on the x-axis and apply some properties
    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.dataFields.value = 'count';
    valueAxis.title.text = 'Number of flights';
    valueAxis.title.fill = am4core.color('#0af');
    valueAxis.renderer.grid.template.stroke = am4core.color('#006ca2');
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color('#0af');
    // Disables the tooltip interaction for the values axis
    valueAxis.cursorTooltipEnabled = false;

    // Declare a new Column data series to represent our data and apply some properties
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = 'Flights';
    series.columns.template.fill = am4core.color('#006ca2');
    series.dataFields.valueX = 'count';
    series.dataFields.categoryY = 'city';
    series.stacked = true;
    series.tooltipText = '[bold]{valueX}[/] flights';
    series.tooltip.label.fill = am4core.color('#0af');
    series.tooltip.background.fill = am4core.color('#001c29');
    series.tooltip.background.stroke = am4core.color('#006ca2');
    series.tooltip.background.strokeWidth = 1;
    series.tooltip.getFillFromObject = false;
    series.tooltip.autoTextColor = false;

    // Create a chart cursor for interactivity but disable the X and Y grid lines
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.disabled = true;
    chart.cursor.lineY.disabled = true;

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
      <div className="container popular-destinations">
        <span className="title">MOST POPULAR DESTINATIONS</span>
        <div ref={this.chartRef} className="chart"></div>
      </div>
    );
  }
}

// Prop type validation
PopularDestinations.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PopularDestinations;
