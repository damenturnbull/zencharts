// My Application
;var MyApp = (function($) {

  'use strict';

  return {

    details: {
      'name':     'My App',
      'version':  'v1.0'
    },

    init: function() {
      // Store 
      this.requestJSON();
    },

    requestJSON: function() {
      // Request JSON
      var jqxhr = $.getJSON("/js/app/mock_data/tickets.json")
        .done  ( this.handleDone )
        .fail  ( this.handleFail )
        .always( this.handleAlways );
    },

    handleDone: function(data) {
      console.log( "success" );
      // console.log( data );
    },

    handleFail: function(data) {
      console.log( "fail" );
      // console.log( data );
    },

    handleAlways: function(data) {
      console.log( "always" );
      // console.log( data );
    }

  };

}(jQuery));


// Runner...
$(document).ready(function(){
  MyApp.init();
});
