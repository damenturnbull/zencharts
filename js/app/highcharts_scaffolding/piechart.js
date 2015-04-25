var PieChartScaffold = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
  },
  title: {
    text: 'Customer Access - Last 7 Days',
  },
  subtitle: {
    text: 'End Users that have logged in to Zendesk.'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>',
        style: {
          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
        }
      }
    }
  },
  series: [{
    type: 'pie',
    name: 'Amount',
    data: [
    {
      name: 'Logged in',     
      y: 35.0,
      color: "#1aa5e1",

    }, {
      name: 'Not logged in',
      y: 65.0,
      color: "#b9cd39",
      sliced: true,
      selected: true
    }

    ]
  }],
  credits: {
    enabled: false
  }  
};