// My Application
var GraphApp = (function($) {
  'use strict';

  return {

    details: {
      'name':     'My App',
      'version':  'v1.0'
    },

    init: function() {
      $('#graphA').highcharts(graphA);
      $('#graphB').highcharts(graphB);
      $('#graphC').highcharts(graphC);
      this.checkForURLHash();
    },

    // Check for the existence of '#error=' or '#access_token' in the URL
    checkForURLHash: function() {
      console.log("Checking for URL Hash...");
      var error = this.getHashParameter("error");
      var token = this.getHashParameter("access_token");

      if(error) {
        console.log('Error exists in URL.');
      } else if(token) {
        console.log('Token exists in URL.');
        this.requestJSON(token);
      } else {
        console.log('No error or token in URL.');
      }
    },

    // Decode URL and search for string
    // http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
    getHashParameter: function(name) {
      return decodeURIComponent((new RegExp('[#|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.hash)||[,""])[1].replace(/\+/g, '%20'))||null;
    }, 

    requestJSON: function(token) {
      var ajax_options = {
        method: 'GET',
        // Add a Basic Auth token in the header
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
      };
      // Make the request...
      $.ajax('https://fando.zendesk.com/api/v2/tickets.json', ajax_options)
        .done     ( this.handleDone )
        .fail     ( this.handleFail )
        .complete ( this.handleComplete )
        .always   ( this.handleAlways );
    },

    handleDone: function(data, textStatus, xhr) {
      console.log( "Ajax success." );
      console.log( data );
    },

    handleFail: function(xhr, textStatus, errorThrown) {
      console.log( "Ajax fail." );
      console.log(xhr);
      console.log(textStatus);
      console.log(errorThrown);
    },

    handleComplete: function() {
      console.log("Ajax complete, hide spinner.");      
    },

    handleAlways: function() {
      console.log( "always" );
      // console.log( data );
    }

  };

}(jQuery));

// Runner
$(document).ready(GraphApp.init());