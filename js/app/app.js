'use strict';
// ------------------------------
// ------------------------------
// ------------------------------
// URL Watcher
// Watch for URLs in the token
// ------------------------------
// ------------------------------
// ------------------------------
var URLWatcher = (function() {

  return { 

    error:        null,
    access_token: null,

    init: function() {
      this.getParamatersFromURL();
    },

    // Check for the existence of '#error=' or '#access_token' in the URL
    getParamatersFromURL: function() {
      this.error        = this.getHashParameter("error");
      this.access_token = this.getHashParameter("access_token");
    },

    // Decode URL and search for string
    // Reference: http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
    getHashParameter: function(name) {
      return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

  };
}());



// ------------------------------
// ------------------------------
// ------------------------------
// APIRequest Prototype
// ------------------------------
// ------------------------------
// ------------------------------
function APIRequest(options) {
  this.url            = options.url;
  this.token          = options.token;
  // this.JSONresponse   = {};
};

APIRequest.prototype.makeAjaxRequest = function(callbackComplete) {
  console.log('request made');
  var self = this;
  var ajax_options = {
    method: 'GET',
    async: true,
    // Add a Basic Auth token in the header
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + self.token);
    }
  };

  // Make the request...
  $.ajax(this.url, ajax_options)
    // Done
    .done(function(data) {
      self.handleDone(data, self)
    })
    // Failure
    .fail( this.handleFail )
    // Complete
    .complete(function(){
      self.handleComplete(callbackComplete);
    })
    // Always
    .always( this.handleAlways );
};

APIRequest.prototype.handleDone = function(data, self) {
  console.log( "Ajax success." );
  self.JSONresponse = data;
};

APIRequest.prototype.handleFail = function(xhr, textStatus, errorThrown) {
  console.log( "Ajax fail." );
  console.log(xhr);
  console.log(textStatus);
  console.log(errorThrown);
};

APIRequest.prototype.handleComplete = function(callbackComplete) {
  console.log("Ajax complete, hide spinner.");  
  callbackComplete();    
};

APIRequest.prototype.handleAlways = function() {
  console.log( "always" );
  // console.log( data );
};

APIRequest.prototype.getJSON = function() {
  return this.JSONresponse;
}


// ------------------------------
// ------------------------------
// ------------------------------
// Graphs
// ------------------------------
// ------------------------------
// ------------------------------
var GraphA = (function($) {

  return { 

    init: function(url) {
      var self = this;

      // Request for Graph A
      var request = new APIRequest({
       url:     url,
       token :  URLWatcher.access_token 
      });

      request.makeAjaxRequest(function() {
        if(request.JSONresponse != null) {
          var percentages = self.getPercentages(request.JSONresponse);
          graphA.series[0].data[0].y = percentages[0];
          graphA.series[0].data[1].y = percentages[1];    
          $('#graphA').highcharts(graphA);           
        } 
      });
    }, 

    setCutOffDate: function(days_before) {
      var date = new Date(); // Today
      return date.setDate( date.getDate() - days_before );   
    },

    convertZendeskDate: function(raw_date) {
      var date_bits = raw_date.split("T");
      var date      = date_bits[0];
      var time      = date_bits[1];
      return new Date(date);
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
    }

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

  URLWatcher.init();

  if(URLWatcher.error) {

    // console.log('Error exists in URL.');

  } else if (URLWatcher.access_token) {

    GraphA.init('https://fando.zendesk.com/api/v2/users/search.json?role=end-user');
    $('#btnMockReports').removeClass('btn--selected');
    $('#btnLiveReports').addClass('btn--selected');

    // // // Request for Graph B
    // var requestB = new APIRequest({
    //  'url':     'https://fando.zendesk.com/api/v2/users/me.json',
    //  'token' :  URLWatcher.access_token 
    // });
    // requestB.makeAjaxRequest();

  } else {
    GraphA.init('/js/app/mock_data/end_users.json');
    console.log('No error or token in URL.');
    $('#btnMockReports').addClass('btn--selected');
    $('#btnLiveReports').removeClass('btn--selected');
  }  


});