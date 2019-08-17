import * as React from 'react'
import * as styles from './style.css'
import { Container, GridCard, Row, TextXLarge, TextMedium } from '../styleComponents'

// Step 2 - Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Step 3 - Include the fusioncharts library
import FusionCharts from 'fusioncharts'

import FusionMaps from 'fusioncharts/fusioncharts.maps'

// Step 4 - Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts'

// Step 4 - Including the chart type
import Widgets from 'fusioncharts/fusioncharts.widgets'

// Step 5 - Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

import World from 'fusioncharts/maps/fusioncharts.world'

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, FusionMaps, World, Widgets, Column2D, FusionTheme)

const chartConfigs = {
  type: 'column2d', // The chart type
  width: '700', // Width of the chart
  height: '400', // Height of the chart
  dataFormat: 'json', // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion',
    },
    // Chart Data
    data: [
      {
        label: 'Venezuela',
        value: '290',
      },
      {
        label: 'Saudi',
        value: '260',
      },
      {
        label: 'Canada',
        value: '180',
      },
      {
        label: 'Iran',
        value: '140',
      },
      {
        label: 'Russia',
        value: '115',
      },
      {
        label: 'UAE',
        value: '100',
      },
      {
        label: 'US',
        value: '30',
      },
      {
        label: 'China',
        value: '30',
      },
    ],
  },
}

const mapConfigs = {
  type: 'world',
  width: '800',
  height: '550',
  dataFormat: 'json',
  dataSource: {
    // Map Configuration
    chart: {
      caption: 'Average Annual Population Growth',
      subcaption: ' 1955-2015',
      numbersuffix: '%',
      includevalueinlabels: '1',
      labelsepchar: ': ',
      entityFillHoverColor: '#FFF9C4',
      theme: 'fusion',
    },
    // Aesthetics; ranges synced with the slider
    colorrange: {
      minvalue: '0',
      code: '#FFE0B2',
      gradient: '1',
      color: [
        {
          minvalue: '0.5',
          maxvalue: '1.0',
          color: '#FFD74D',
        },
        {
          minvalue: '1.0',
          maxvalue: '2.0',
          color: '#FB8C00',
        },
        {
          minvalue: '2.0',
          maxvalue: '3.0',
          color: '#E65100',
        },
      ],
    },
    // Source data as JSON --> id represents countries of world.
    data: [
      {
        id: 'NA',
        value: '.82',
        showLabel: '1',
      },
      {
        id: 'SA',
        value: '2.04',
        showLabel: '1',
      },
      {
        id: 'AS',
        value: '1.78',
        showLabel: '1',
      },
      {
        id: 'EU',
        value: '.40',
        showLabel: '1',
      },
      {
        id: 'AF',
        value: '2.58',
        showLabel: '1',
      },
      {
        id: 'AU',
        value: '1.30',
        showLabel: '1',
      },
    ],
  },
}

const gaugeConfigs = {
  type: 'angulargauge', // The gauge type
  width: '450', // Width of the gauge
  height: '250', // Height of the gauge
  dataFormat: 'json', // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption: "Nordstrom's Customer Satisfaction Score for 2017",
      lowerLimit: '0',
      upperLimit: '100',
      showValue: '1',
      numberSuffix: '%',
      theme: 'fusion',
      showToolTip: '0',
    },
    // Chart Data
    colorRange: {
      color: [
        {
          minValue: '0',
          maxValue: '50',
          code: '#F2726F',
        },
        {
          minValue: '50',
          maxValue: '75',
          code: '#FFC533',
        },
        {
          minValue: '75',
          maxValue: '100',
          code: '#62B58F',
        },
      ],
    },
    dials: {
      dial: [
        {
          value: '81',
        },
      ],
    },
  },
}

export class DashboardComp extends React.Component {
  render() {
    return (
      <Container className={styles.module}>
        <Container className="container-fuild">
          <Row>
            <Container className="col-lg-3 col-sm-6">
              <GridCard className="card is-card-dark grid-card">
                <Container className="card-heading">
                  <Container className="red">Total Revenue</Container>
                </Container>
                <Container className={styles.isLightText}>
                  <TextMedium>$</TextMedium>
                  <TextXLarge>10.5</TextXLarge>
                </Container>
              </GridCard>
            </Container>
            <Container className="col-lg-3 col-sm-6">
              <GridCard>
                <Container className="card-heading">
                  <Container>Total Revenue</Container>
                </Container>
                <Container className="card-value">
                  <span>$</span>
                </Container>
              </GridCard>
            </Container>
            <Container className="col-lg-3 col-sm-6">
              <GridCard>
                <Container className="card-heading">
                  <Container>Total Revenue</Container>
                </Container>
                <Container className="card-value">
                  <span>$</span>
                </Container>
              </GridCard>
            </Container>
            <Container className="col-lg-3 col-sm-6">
              <GridCard>
                <Container className="card-heading">
                  <Container>Total Revenue</Container>
                </Container>
                <Container className="card-value">
                  <span>$</span>
                </Container>
              </GridCard>
            </Container>
          </Row>
          <Row>
            <Container className="col-md-4 col-lg-3">
              <GridCard className="card">
                <Container className="card-heading">
                  <Container>Total Revenue</Container>
                </Container>
                <Container className="card-value">
                  <span>$</span>
                </Container>
              </GridCard>
            </Container>
            <Container className="col-md-8">
              <Container className="card">
                <Container className="row">
                  <Container className="col-sm-4">
                    <Container className="chart-container">
                      <ReactFC {...gaugeConfigs} />
                    </Container>
                  </Container>
                  <Container className="col-sm-4">
                    <Container className="chart-container">
                      <ReactFC {...gaugeConfigs} />
                    </Container>
                  </Container>
                  <Container className="col-sm-4">
                    <Container className="chart-container">
                      <ReactFC {...gaugeConfigs} />
                    </Container>
                  </Container>
                </Container>
              </Container>
            </Container>
          </Row>
          <Row>
            <Container className="col-md-6">
              <Container className="card">
                <Container className="chart-div">
                  <ReactFC {...chartConfigs} />
                </Container>
              </Container>
            </Container>
            <Container className="col-md-6">
              <Container className="card">
                <Container className="map-div">
                  <ReactFC {...mapConfigs} />
                </Container>
              </Container>
            </Container>
          </Row>
        </Container>
      </Container>
    )
  }
}
