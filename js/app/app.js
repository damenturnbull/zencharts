'use strict';
// Watch for URLs in the token
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
    // http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
    getHashParameter: function(name) {
      return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||null;
    }

  };
}());


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


// Runner
$(document).ready(function(){

  URLWatcher.init();

  if(URLWatcher.error) {

    // console.log('Error exists in URL.');

  } else if (URLWatcher.access_token) {

    // console.log('Token exists in URL:' + URLWatcher.access_token);

    // Request for Graph A
    var requestA = new APIRequest({
     url:     '/js/app/mock_data/end_users.json',
     token :  URLWatcher.access_token 
    });

    var end_users_raw = "raw empty";
    requestA.makeAjaxRequest(function() {
      end_users_raw = requestA.JSONresponse;
      console.log(end_users_raw);

      // console.log(users);

      var end_users       = end_users_raw.users;
      var count_end_users = end_users.length;
      var count_logged_in = 0;

      function percentages() {
        for(var i = 0; i < end_users_raw.count; i++) {

          var last_logged_in_raw = end_users[i].last_login_at;

          // Break if never logged in
          if(last_logged_in_raw == null) break;

          var date_bits       = last_logged_in_raw.split("T");
          var date            = date_bits[0];
          var time            = date_bits[1];
          var last_logged_in  = new Date(date);

          var cutoff          = new Date(); // Today
          cutoff.setDate( cutoff.getDate() - 15 ); // 15 days ago

          // console.log("Last login:\t" + last_logged_in);
          // console.log("Cutoff:\t\t" + cutoff);
          if(last_logged_in >= cutoff) {
            count_logged_in++;
          }
        }
        // console.log("count users  is: " + count_end_users);
        // console.log("count log in is: " + count_logged_in);

        var perc_logged_in      = (Math.round((count_logged_in / count_end_users) * 100));
        var perc_not_logged_in  = 100 - perc_logged_in;
        // console.log(perc_logged_in);
        // console.log(perc_not_logged_in);  

        return {
          'perc_logged_in':     perc_logged_in,
          'perc_not_logged_in': perc_not_logged_in
        }
      }

      var percentages = percentages();
      // console.log(percentages.perc_logged_in);
      // console.log(percentages.perc_not_logged_in);

      graphA.series[0].data[0].y = percentages.perc_logged_in;
      graphA.series[0].data[1].y = percentages.perc_not_logged_in;    
      $('#graphA').highcharts(graphA);
      // $('#graphB').highcharts(graphB);
      // $('#graphC').highcharts(graphC);      



    });

    // // // Request for Graph B
    // var requestB = new APIRequest({
    //  'url':     'https://fando.zendesk.com/api/v2/users/me.json',
    //  'token' :  URLWatcher.access_token 
    // });
    // requestB.makeAjaxRequest();

  } else {
    console.log('No error or token in URL.');
  }  


});