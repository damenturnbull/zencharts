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
  this.JSONresponse   = null;
};

APIRequest.prototype.makeAjaxRequest = function() {
  console.log('request made');
  var self = this;
  var ajax_options = {
    method: 'GET',
    // Add a Basic Auth token in the header
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + self.token);
    }
  };
  // Make the request...
  $.ajax(this.url, ajax_options)
    .done     ( this.handleDone )
    .fail     ( this.handleFail )
    .complete ( this.handleComplete )
    .always   ( this.handleAlways );
};

APIRequest.prototype.handleDone = function(data, textStatus, xhr) {
  console.log( "Ajax success." );
  console.log( data );
  this.JSONresponse = data;
};

APIRequest.prototype.handleFail = function(xhr, textStatus, errorThrown) {
  console.log( "Ajax fail." );
  console.log(xhr);
  console.log(textStatus);
  console.log(errorThrown);
};

APIRequest.prototype.handleComplete = function() {
  console.log("Ajax complete, hide spinner.");      
};

APIRequest.prototype.handleAlways = function() {
  console.log( "always" );
  // console.log( data );
};

APIRequest.prototype.getJSON = function() {
  return this.getJSONresponse;
}


// Runner
$(document).ready(function(){

  URLWatcher.init();

  if(URLWatcher.error) {

    console.log('Error exists in URL.');

  } else if (URLWatcher.access_token) {

    console.log('Token exists in URL:' + URLWatcher.access_token);

    // Request for Graph A
    var requestA = new APIRequest({
     url:     'https://fando.zendesk.com/api/v2/tickets.json',
     token :  URLWatcher.access_token 
    });
    requestA.makeAjaxRequest();

    // // Request for Graph B
    var requestB = new APIRequest({
     'url':     'https://fando.zendesk.com/api/v2/users/me.json',
     'token' :  URLWatcher.access_token 
    });
    requestB.makeAjaxRequest();

    $('#graphA').highcharts(graphA);
    $('#graphB').highcharts(graphB);
    $('#graphC').highcharts(graphC);

  } else {
    console.log('No error or token in URL.');
  }  
});