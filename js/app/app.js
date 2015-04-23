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
      this.testAjax();
      // this.requestJSON();
    },

    testAjax: function() {
      // var username = "damenturnbull@gmail.com";
      // var password = "1the2one3"; 
      var username = "damenturnbull@gmail.com/token";
      var password = "6BAyvE4LKXDtaoLB3t2jyNeYIj3qtshWxs2WH80Y"; 

      function make_base_auth(username, password) {
        var tok = username + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
      }

      $.ajaxSetup({
          headers: { 'Authorization': "Basic ZGFtZW50dXJuYnVsbEBnbWFpbC5jb20vdG9rZW46NkJBeXZFNExLWER0YW9MQjN0Mmp5TmVZSWozcXRzaFd4czJXSDgwWQ==" }
      });

      $.ajax({
          type: "GET",
          // url: "http://jsonplaceholder.typicode.com/posts",
          url: "https://fando.zendesk.com/api/v2/tickets.json",
          dataType: 'jsonp',
          jsonp: false,
          async: true,
          // data: '{}',
          beforeSend: function (xhr){ 
              // xhr.setRequestHeader("Authorization", "Basic ZGFtZW50dXJuYnVsbEBnbWFpbC5jb20vdG9rZW46NkJBeXZFNExLWER0YW9MQjN0Mmp5TmVZSWozcXRzaFd4czJXSDgwWQ==");
              // xhr.setRequestHeader('Authorization', make_base_auth(username, password)); 
          },
          success: function () {
            console.log('success');
          },
          complete: function(data) {
            console.log(data.responseText);
          }
      });
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

// Runner
$(document).ready(MyApp.init());