// ------------------------------
// Main
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
    graph_c_datasource = '';
    
    // Setup buttons

  } else {
    setGraphButtons(false);
    console.log('No access_token in URL.');

    if(url_error) {
      console.log('Error exists in URL.');
    }

    graph_a_datasource = '/js/custom/mock_data/end_users.json';
    graph_b_datasource = '';
    graph_c_datasource = '';
  }  

  // TODO Dry this up...

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

  // Render Line Graph
  var barChartRequest = new OAuthRequest({
    url:    graph_c_datasource,
    token:  url_access_token 
  });

  barChartRequest.makeAjaxRequest(function() {
    if(barChartRequest.JSONresponse != null) {
      GraphC.init(barChartRequest.JSONresponse);         
    } 
  });    

});