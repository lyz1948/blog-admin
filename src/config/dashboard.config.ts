
export const gaugeConfigs = {
  type: 'angulargauge', // The gauge type
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

export const chartConfigs = {
  type: 'column2d', // The chart type
  width: '100%', // Width of the chart
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

export const mapConfigs = {
  type: 'world',
  width: '100%',
  height: '300',
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

export const doughuntConfigs = {
  type: 'Pie2D',
  width: '100%',
  height: 250,
  dataFormat: 'json',
  dataSource: {
    chart: {
      caption: 'Market Share of Web Servers',
      plottooltext: '<b>$percentValue</b> of web servers run on $label servers',
      showPercentValues: '1',
      useDataPlotColorForLabels: '1',
      enableMultiSlicing: '0',
      theme: 'fusion',
    },
    data: [
      {
        label: 'Apache',
        value: '32647479',
      },
      {
        label: 'Microsoft',
        value: '22100932',
      },
      {
        label: 'Zeus',
        value: '14376',
      },
      {
        label: 'Other',
        value: '18674221',
      },
    ],
  },
}
