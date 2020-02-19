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
    this.state = {
      chart: undefined,
    };
  }

  componentDidMount() {
    const chart = am4core.create('popular-destinations', am4charts.PieChart);

    chart.data = this.props.data.list;
    chart.radius = am4core.percent(70);
    chart.shiftRadius = 0.1;

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'count';
    pieSeries.dataFields.category = 'city';

    chart.hiddenState.properties.opacity = 0;

    pieSeries.colors.step = 3;

    pieSeries.slices.template.stroke = am4core.color('#001c29');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 1;

    pieSeries.labels.template.text = '{city} ({destination}): {value.value} flights';
    pieSeries.slices.template.tooltipText = '{city}: {value.value} flights';

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'right';
    chart.legend.maxHeight = 300;
    chart.legend.scrollable = true;

    chart.legend.markers.template.disabled = true;

    chart.legend.labels.template.fill = am4core.color('#00aaff');
    chart.legend.valueLabels.template.fill = am4core.color('#00aaff');
    chart.legend.labels.template.text = '{city}';
    chart.legend.valueLabels.template.text = '{count} flights';
    chart.legend.width = 300;
    chart.legend.labels.template.minWidth = 150;

    pieSeries.tooltip.getFillFromObject = false;
    pieSeries.tooltip.autoTextColor = false;
    pieSeries.tooltip.background.fill = am4core.color('#001c29');
    pieSeries.tooltip.label.fill = am4core.color('#0af');
    pieSeries.tooltip.background.stroke = am4core.color('#006ca2');
    pieSeries.tooltip.background.strokeWidth = 1;

    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    const hs = pieSeries.slices.template.states.getKey('hover');
    hs.properties.scale = 1;
    hs.properties.shiftRadius = 0.1;

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
      <div className="popular-destinations"></div>
    );
  }
}

PopularDestinations.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PopularDestinations;
