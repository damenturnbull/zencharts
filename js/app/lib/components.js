// ------------------------------
// Components
// ------------------------------
var ZenchartsButtons = React.createClass({

  getInitialState: function() {
    return {
      live_mode: (ZenCharts.url_access_token !== null) ? true : false
    }
  },

  getClassNames: function(selected) {
    var class_str     = "btn btn--primary btn--report";    
    var selected_str  = (selected) ? ' btn--selected' : '';
    return class_str.concat(selected_str);
  },

  render: function() {
    var mock_href     = "/";
    var live_href     = "https://fando.zendesk.com/oauth/authorizations/new?client_id=beautifully_simple_report&amp;response_type=token&amp;redirect_uri=http://localhost:3000/&amp;scope=read";
    var mock_classes  = this.getClassNames(!this.state.live_mode);
    var live_classes  = this.getClassNames(this.state.live_mode);
    return (
      <div>
        <Button className={mock_classes} ref="btnMockReports" href={mock_href}>
          Mock Reports
        </Button>
        <Button className={live_classes} ref="btnLiveReports" href={live_href}>
          Live Reports
        </Button>
        <Status live_mode={this.state.live_mode}/>
      </div>
    );
  }
});

var Button = React.createClass({

  getInitialState: function() {
    return {
      icon: "fa fa-bar-chart"
    }
  },  

  updateIcon: function(e) {
    this.setState({ 
      icon: "fa fa-refresh fa-spin"
    });    
  },

  render: function() {
    return (
      <a onClick={this.updateIcon} className={this.props.className} id={this.props.ref} href={this.props.href}>
        <Icon icon={this.state.icon}/>{this.props.children}
      </a>
    );
  }
});

var Status = React.createClass({

  getInitialState: function() {
    return {
      connected:  "disconnected",
      icon:       "fa fa-ban"
    }
  },

  componentWillMount: function() {
    this.setState({
      connected:  (this.props.live_mode) ? "connected" : "disconnected",
      icon:       (this.props.live_mode) ? "fa fa-bolt" : "fa fa-ban"
    })
  },  

  render: function() {
    var class_name = "header__status header__status--".concat(this.state.connected);
    return (
      <p className={class_name}>
        <Icon icon={this.state.icon}/>&nbsp;&nbsp;OAuth - https://fando.zendesk.com
      </p>
    )
  }
});

var Icon = React.createClass({

  render: function() {
    return (
      <span className={this.props.icon}></span>
    )
  }
});

// Output
React.render(<ZenchartsButtons />, document.getElementById('controls'));
