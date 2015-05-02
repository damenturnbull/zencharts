// ------------------------------
// Components
// ------------------------------
var ZenchartsUI = React.createClass({

  mockId:     "btnMockReports",
  liveId:     "btnLiveReports",
  mockHref:   "/",
  liveHref:   "https://fando.zendesk.com/oauth/authorizations/new?client_id=beautifully_simple_report&amp;response_type=token&amp;redirect_uri=http://localhost:3000/&amp;scope=read",

  getInitialState: function() {
    var live = (ZenCharts.url_access_token !== null) ? true : false;
    return {
      live: live,
      mock: !live,
      icon: "fa fa-bar-chart"
    }
  },

  updateIcon: function() {
    this.setState({ 
      icon: "fa-refresh fa-spin"
    });    
  },

  render: function() {
    return (
      <div>
        <Button onClick={this.updateIcon} selected={this.state.mock} id={this.mockId} href={this.mockHref}>
          <Icon icon={this.state.icon}/>Mock Reports
        </Button>
        <Button onClick={this.updateIcon} selected={this.state.live} id={this.liveId} href={this.liveHref}>
          <Icon icon={this.state.icon}/>Live Reports
        </Button>
      </div>
    );
  }
});

var Button = React.createClass({

  render: function() {
    var classSelected = (this.props.selected) ? ' btn--selected' : '';
    var className     = "btn btn--primary btn--report".concat(classSelected);
    return (
      <a className={className} id={this.props.id} href={this.props.href}>{this.props.children}</a>
    );
  }
});

var Icon = React.createClass({

  render: function() {
    return (
      <span className={this.props.icon}></span>
    )
  }
})

// Output
React.render(<ZenchartsUI />, document.getElementById('reportButtons'));

