// ------------------------------
// TODO
// ------------------------------
// TODO - Prototype object for a Generic Chart Builder

// ------------------------------
// Pie Chart
// ------------------------------
var PieChartBuilder = (function() {
  'use strict';

  return { 

    init: function(data) {
      var percentages = this.getPercentages(data);
      PieChartScaffold.series[0].data[0].y = percentages[0];
      PieChartScaffold.series[0].data[1].y = percentages[1]; 
      $('#graphA').highcharts(PieChartScaffold);           
    }, 

    // TODO - decouple getPercentages
    getPercentages: function(json_data) {
      var end_users       = json_data.users;
      var count_logged_in = 0;

      for(var i = 0; i < json_data.count; i++) {
        var last_login_at = end_users[i].last_login_at;
        // Don't count users that have never logged in
        if(last_login_at != null) {
          // Get dates to compare
          var last_login_at   = this.parseZendeskDate(last_login_at);
          var cutoff_date     = this.setCutOffDate(7);
          // Count...
          if(last_login_at >= cutoff_date) {
            count_logged_in++;
          }
        }
      }
      // Calculate percentages
      var perc_logged_in      = (Math.round((count_logged_in / json_data.count) * 100));
      var perc_not_logged_in  = 100 - perc_logged_in;
      return [perc_logged_in, perc_not_logged_in];
    },

    // Zendesk raw date string: "2015-04-24T01:30:00Z"
    // TODO - tighten up date calculations (currently H:M:S and Timezone is ignored)
    parseZendeskDate: function(raw_date) {
      var date_bits = raw_date.split("T");
      var date      = date_bits[0];
      var time      = date_bits[1];
      return new Date(date);
    },

    // Returns date 'x' days prior to today
    setCutOffDate: function(days_before) {
      var date = new Date(); // Today
      return date.setDate( date.getDate() - days_before );   
    }

  };
}());

// ------------------------------
// Line Graph
// ------------------------------
var LineGraphBuilder = (function() {

  return { 

    init: function(data) {
      $('#graphB').highcharts(LineGraphScaffold);           
    }

    // TODO - Integrate dynamic live data

  };
}());

// ------------------------------
// Bar Chart
// ------------------------------
var BarGraphBuilder = (function() {

  return { 

    init: function(data) {
      $('#graphC').highcharts(BarGraphScaffold);           
    }

    // TODO - Integrate dynamic live data

  };
}());

