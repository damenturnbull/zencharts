// ------------------------------
// ZenCharts
// ------------------------------
var ZenCharts = (function (){
  'use strict';
    
  var url_access_token  = null,
      url_error         = null;

  return { 

    source_piechart_mock:  '/js/app/mock_data/end_users.json',         
    source_piechart_live:  'https://fando.zendesk.com/api/v2/users/search.json?role=end-user',         
    
    source_linegraph_mock: '',         
    source_linegraph_live: '',
    
    source_bargraph_mock:  '/js/app/mock_data/tickets_solved.json',
    source_bargraph_live:  'https://fando.zendesk.com/api/v2/views/51787888/tickets.json',

    piechart_builder:  PieChartBuilder,
    linegraph_builder: LineGraphBuilder,
    bargraph_builder:  BarGraphBuilder,

    setURLHashParameters: function() {
      this.url_access_token = this.getURLHashParameter("access_token");
      this.url_error        = this.getURLHashParameter("error");

      if (this.url_access_token) {
        console.log('access_token in the URL.');
      } else {
        console.log('No access_token in URL.');
        if(this.url_error) {
          console.log('Error exists in URL.');
        }
      }        
    },

    // Decode URL and search for string
    getURLHashParameter: function(name) {
      // Reference: http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
      return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||null;
    },  

    makePieChart: function() {
      var source = (this.url_access_token) ? this.source_piechart_live : this.source_piechart_mock;
      this.makeRequestBuildChart( this.newRequest(source), this.piechart_builder );
    },

    makeLineGraph: function() {
      var source = (this.url_access_token) ? this.source_linegraph_live : this.source_linegraph_mock; 
      this.makeRequestBuildChart( this.newRequest(source), this.linegraph_builder );
    },

    makeBarChart: function() {
      var source = (this.url_access_token) ? this.source_bargraph_live : this.source_bargraph_mock;    
      this.makeRequestBuildChart( this.newRequest(source), this.bargraph_builder );
    },

    newRequest: function(source) {
      return new OAuthRequest({
        url:    source,
        token:  this.url_access_token
      });   
    },

    // Send request and Re-Render Graph
    makeRequestBuildChart: function(requestObj, chart_builder) {
      // Render Graph
      requestObj.makeAjaxRequest(function() {
        if(requestObj.JSONresponse == null) return;
        chart_builder.init(requestObj.JSONresponse);         
      });  
    }

  };
}());

// ------------------------------
// Runner
// ------------------------------
$(document).ready(function() {
  // Check for URL hash
  ZenCharts.setURLHashParameters();
  // Make Charts
  ZenCharts.makePieChart();
  ZenCharts.makeLineGraph();
  ZenCharts.makeBarChart();
});


