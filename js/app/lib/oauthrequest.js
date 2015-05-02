'use strict';
// ------------------------------
// OAuthRequest Prototype
// ------------------------------
function OAuthRequest(options) {
  this.url            = options.url;
  this.token          = options.token;
  this.JSONresponse   = null;
};

OAuthRequest.prototype = {

  makeAjaxRequest: function(callbackComplete) {
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
  },

  handleDone: function(data, self) {
    console.log( "Ajax success." );
    self.JSONresponse = data;
  },

  handleFail: function(xhr, textStatus, errorThrown) {
    console.log( "Ajax fail." );
    // console.log(xhr);
    // console.log(textStatus);
    // console.log(errorThrown);
  },

  handleComplete: function(callbackComplete) {
    console.log("Ajax complete.");  
    callbackComplete();    
  },

  handleAlways: function() {
    console.log( "Ajax always." );
    // console.log( data );
  },

  getJSON: function() {
    return this.JSONresponse;
  }  

}