'use strict';
// ------------------------------
// ------------------------------
// ------------------------------
// URL Watcher
// Watch for URLs in the token
// ------------------------------
// ------------------------------
// ------------------------------



// ------------------------------
// ------------------------------
// ------------------------------
// Graphs
// ------------------------------
// ------------------------------
// ------------------------------
var GraphA = (function($) {

  return { 

    init: function(data) {
      var percentages = this.getPercentages(data);
      graphA.series[0].data[0].y = percentages[0];
      graphA.series[0].data[1].y = percentages[1];    
      $('#graphA').highcharts(graphA);           
    }, 

    getPercentages: function(json_data) {
      var end_users       = json_data.users;
      var count_logged_in = 0;

      for(var i = 0; i < json_data.count; i++) {
        var last_login_at = end_users[i].last_login_at;
        // Don't count users that have never logged in
        if(last_login_at == null) break;
        // Get dates to compare
        var last_login_at   = this.convertZendeskDate(last_login_at);
        var cutoff_date     = this.setCutOffDate(15);
        // Count...
        if(last_login_at >= cutoff_date) {
          count_logged_in++;
        }
      }
      // Calculate percentages
      var perc_logged_in      = (Math.round((count_logged_in / json_data.count) * 100));
      var perc_not_logged_in  = 100 - perc_logged_in;
      return [perc_logged_in, perc_not_logged_in];
    },

    // TODO tighten date adjustment to account for GMT
    // Currently the time is ignored
    convertZendeskDate: function(raw_date) {
      var date_bits = raw_date.split("T");
      var date      = date_bits[0];
      var time      = date_bits[1];
      return new Date(date);
    },

    setCutOffDate: function(days_before) {
      var date = new Date(); // Today
      return date.setDate( date.getDate() - days_before );   
    }

  };
}(jQuery));

var GraphB = (function($) {

  return { 

    init: function(data) {
      // var percentages = this.getPercentages(data);
      // graphB.series[0].data[0].y = percentages[0];
      // graphB.series[0].data[1].y = percentages[1];    
      $('#graphB').highcharts(graphB);           
    }, 

    // setCutOffDate: function(days_before) {
    //   var date = new Date(); // Today
    //   return date.setDate( date.getDate() - days_before );   
    // },

    // // TODO tighten date adjustment to account for GMT
    // // Currently the time is ignored
    // convertZendeskDate: function(raw_date) {
    //   var date_bits = raw_date.split("T");
    //   var date      = date_bits[0];
    //   var time      = date_bits[1];
    //   return new Date(date);
    // },

    // getPercentages: function(json_data) {
    //   var end_users       = json_data.users;
    //   var count_logged_in = 0;

    //   for(var i = 0; i < json_data.count; i++) {
    //     var last_login_at = end_users[i].last_login_at;
    //     // Don't count users that have never logged in
    //     if(last_login_at == null) break;
    //     // Get dates to compare
    //     var last_login_at   = this.convertZendeskDate(last_login_at);
    //     var cutoff_date     = this.setCutOffDate(15);
    //     // Count...
    //     if(last_login_at >= cutoff_date) {
    //       count_logged_in++;
    //     }
    //   }
    //   // Calculate percentages
    //   var perc_logged_in      = (Math.round((count_logged_in / json_data.count) * 100));
    //   var perc_not_logged_in  = 100 - perc_logged_in;
    //   return [perc_logged_in, perc_not_logged_in];
    // }

  };
}(jQuery));

// ------------------------------
// ------------------------------
// ------------------------------
// Runner
// ------------------------------
// ------------------------------
// ------------------------------
$(document).ready(function(){

  // Decode URL and search for string
  function getURLHashParameter(name) {
    // Reference: http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
    return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||null;
  }

  // Show spinner on graph buttons
  function graphButtonListener() {
    $('.btn--report').click(function(event){
      $(this).find('.fa').removeClass('fa-bar-chart').addClass('fa-refresh fa-spin');
    });
  }

  // Set style of mock and live buttons
  function setGraphButtons(liveData) {
    var btn_mock        = $('#btnMockReports');
    var btn_live        = $('#btnLiveReports');
    var class_selected  = 'btn--selected';
    if(liveData) {
      btn_mock.removeClass(class_selected);
      btn_live.addClass(class_selected);
    } else {
      btn_mock.addClass(class_selected);
      btn_live.removeClass(class_selected);
    }
    graphButtonListener();
  }


  var url_access_token = getURLHashParameter("access_token");
  var url_error        = getURLHashParameter("error");

  var graph_a_datasource = null;
  var graph_b_datasource = null;
  var graph_c_datasource = null;

  if (url_access_token) {
    setGraphButtons(true);

    console.log('access_token in the URL.');
    // Set URLs for live data
    graph_a_datasource = 'https://fando.zendesk.com/api/v2/users/search.json?role=end-user';
    graph_b_datasource = '';
    
    // Setup buttons

  } else {
    setGraphButtons(false);
    console.log('No access_token in URL.');

    if(url_error) {
      console.log('Error exists in URL.');
    }

    graph_a_datasource = '/js/app/mock_data/end_users.json';
    graph_b_datasource = '';
  }  

  // Render Pie Chart
  var pieChartRequest = new OAuthRequest({
    url:    graph_a_datasource,
    token:  url_access_token
  });

  pieChartRequest.makeAjaxRequest(function() {
    if(pieChartRequest.JSONresponse != null) {
      GraphA.init(pieChartRequest.JSONresponse);         
    } 
  });    

  // Render Line Graph
  var lineGraphRequest = new OAuthRequest({
    url:    graph_b_datasource,
    token:  url_access_token 
  });

  lineGraphRequest.makeAjaxRequest(function() {
    if(lineGraphRequest.JSONresponse != null) {
      GraphB.init(lineGraphRequest.JSONresponse);         
    } 
  });    

});