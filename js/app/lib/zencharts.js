// ------------------------------
// ZenCharts
// ------------------------------
var ZenCharts = (function() {
  'use strict';
    
  return { 

    url_access_token:   null,
    url_error:          null, 

    source_piechart_mock:  '/js/app/mock_data/end_users.json',         
    source_piechart_live:  'https://fando.zendesk.com/api/v2/users/search.json?role=end-user',         
    
    source_linegraph_mock: '',         
    source_linegraph_live: '',
    
    source_bargraph_mock:  '',
    source_bargraph_live:  '',

    piechart_builder:  PieChartBuilder,
    linegraph_builder: LineGraphBuilder,
    bargraph_builder:  BarGraphBuilder,

    init: function() {
      // Setup
      this.setURLHashParameters();
      this.styleGraphButtons();
      this.toggleConnectionStatus();
      // Make Charts
      this.makePieChart();
      this.makeLineGraph();
      this.makeBarChart();
    },

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

    // Set style of mock and live buttons
    styleGraphButtons: function() {
      var btn_mock        = $('#btnMockReports');
      var btn_live        = $('#btnLiveReports');
      var class_selected  = 'btn--selected';
      // Show selection
      if(this.url_access_token) {
        btn_mock.removeClass(class_selected);
        btn_live.addClass(class_selected);
      } else {
        btn_mock.addClass(class_selected);
        btn_live.removeClass(class_selected);
      }
      this.graphButtonListener();
    },    

    // Show spinner on graph buttons
    graphButtonListener: function() {
      $('.btn--report').click(function(event){
        $(this).find('.fa').removeClass('fa-bar-chart').addClass('fa-refresh fa-spin');
      });
    }, 

    // Set style of mock and live buttons
    toggleConnectionStatus: function() {
      var status              = $('.header__status');
      var class_connected     = 'header__status--connected';
      var class_disconnected  = 'header__status--disconnected';
      var icon                = status.find('.fa');
      var icon_connected      = 'fa-bolt';
      var icon_disconnected   = 'fa-ban';
      // Show selection
      if(this.url_access_token) {
        status.removeClass(class_disconnected).addClass(class_connected);
        icon.removeClass(icon_disconnected).addClass(icon_connected);
      } else {
        status.addClass(class_disconnected).removeClass(class_connected);
        icon.removeClass(icon_connected).addClass(icon_disconnected);
      }
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
$(document).ready( ZenCharts.init() );


