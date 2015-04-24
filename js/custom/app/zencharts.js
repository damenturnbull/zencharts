// ------------------------------
// ZenCharts
// ------------------------------
var ZenCharts = (function() {

  return { 

    url_access_token:   null, 
    url_error:          null, 

    source_piechart_mock:  '/js/custom/mock_data/end_users.json',         
    source_piechart_live:  'https://fando.zendesk.com/api/v2/users/search.json?role=end-user',         
    
    source_linegraph_mock: '',         
    source_linegraph_live: '',
    
    source_barchart_mock:  '',
    source_barchart_live:  '',

    pie_chart_builder:  PieChartBuilder,
    line_graph_builder: LineGraphBuilder,
    bar_chart_builder:  BarChartBuilder,

    init: function() {
      // Setup
      this.setURLHashParameters();
      this.styleGraphButtons();
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

    // TODO - DRY these up...
    makePieChart: function(chart_name) {
      var datasource = (this.url_access_token) ? 
                        this.source_piechart_live  : 
                        this.source_piechart_mock;
      // Request additional data
      var piechart_request = new OAuthRequest({
        url:    datasource,
        token:  this.url_access_token
      });
      // Render Graph
      var self = this;
      piechart_request.makeAjaxRequest(function() {
        if(piechart_request.JSONresponse == null) return;
        self.pie_chart_builder.init(piechart_request.JSONresponse);         
      });     
    },

    makeLineGraph: function() {
      var datasource = (this.url_access_token) ? 
                        this.source_linegraph_live : 
                        this.source_linegraph_mock; 
      // Request additional data
      var linegraph_request = new OAuthRequest({
        url:    datasource,
        token:  this.url_access_token 
      });
      // Render Graph
      var self = this;
      linegraph_request.makeAjaxRequest(function() {
        if(linegraph_request.JSONresponse == null) return;
        self.line_graph_builder.init(linegraph_request.JSONresponse);         
      });    
    },

    makeBarChart: function() {
      var datasource = (this.url_access_token) ? 
                        this.source_barchart_live : 
                        this.source_barchart_mock;    
      // Request additional data
      var barchart_request = new OAuthRequest({
        url:    datasource,
        token:  this.url_access_token 
      });
      // Render Graph
      var self = this;
      barchart_request.makeAjaxRequest(function() {
        if(barchart_request.JSONresponse == null) return;
        self.bar_chart_builder.init(barchart_request.JSONresponse);         
      });  
    }     

  };
}());

// ------------------------------
// Runner
// ------------------------------
$(document).ready( ZenCharts.init() );


