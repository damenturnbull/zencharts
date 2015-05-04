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
      $('#graphA').remove('.graph__loader').highcharts(PieChartScaffold);           
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
      this.renderChart();
    },

    renderChart: function() {
      $('#graphB').remove('.graph__loader').highcharts(LineGraphScaffold);           
    }

    // TODO - Integrate dynamic live data

  };
}());

// ------------------------------
// Bar Chart
// ------------------------------
var BarGraphBuilder = (function() {

  return { 

    assignees:  {},
    categories: [],
    series:     [],

    init: function(json) {
      if(typeof json !== 'object') return false;
      this.getTotalSolvedByAssignees(json);
      this.requestAssigneeNames();
    },

    getTotalSolvedByAssignees: function(json) {
      if(json.count   == undefined) return false;
      if(json.tickets == undefined) return false;
      for(var i = 0; i < json.count; i++) {
         var assignee_id = json.tickets[i].assignee_id;
         if( !(assignee_id in this.assignees) ) {
          this.assignees[assignee_id] = 1;
        } else if( (assignee_id in this.assignees) ) {
          this.assignees[assignee_id] += 1;
        }
      }
    },

    requestAssigneeNames: function() {
      // Send another request for the names of the assignees
      var live_source = 'https://fando.zendesk.com/api/v2/users/search.json?role=agent',
          mock_source = '/js/app/mock_data/agents.json',
          source      = (ZenCharts.url_access_token) ? live_source : mock_source,
          self        = this,
          req         = ZenCharts.newRequest(source);

      req.makeAjaxRequest(function() {
        if(req.JSONresponse == null) return;
        self.setAssigneeNames(req.JSONresponse);         
      });        
    },

    setAssigneeNames: function(json) {
      for(var i = 0; i < json.count; i++) {
        var agent_id = json.users[i].id;
        if( (agent_id in this.assignees) ) {
          this.categories.push(json.users[i].name);
          this.series.push(this.assignees[agent_id]);
        }
      }
      BarGraphScaffold.xAxis.categories = this.categories;
      BarGraphScaffold.series[0].data   = this.series; 
      this.renderChart();
    },

    renderChart: function() {
      $('#graphC').remove('.graph__loader').highcharts(BarGraphScaffold);           
    }

  };
}());

