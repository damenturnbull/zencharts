var BarGraphScaffold = 
{       
  chart: {
    type: 'column'
  },
  title: {
    text: 'Tickets Solved - Last 7 Days <strong>(MOCK ONLY)</strong>'
  },
  subtitle: {
    text: "Number of tickets solved by each Agent."
  },
  xAxis: {
    categories: ['Sally', 'Joe', 'Max', 'Steve', 'Maria'],
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Tickets Solved'
    },
    labels: {
      overflow: 'justify'
    }
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    enabled: false,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 100,
    floating: true,
    borderWidth: 1,
    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
    shadow: true
  },
  credits: {
    enabled: false
  },
  series: [{
    name: 'Tickets solved',
    color: "#1aa5e1",
    data: [14, 3, 27, 8, 11]
  }]
};
