var ReactProgressBar;

ReactProgressBar = React.createClass({
  displayName: 'FileButton',
  render: function() {
    return React.DOM.div({
      className: "progress"
    }, React.DOM.span({
      className: "progress-meter"
    }, React.DOM.p({
      className: "progress-meter-text"
    }, this.props.text)));
  }
});

module.exports = ReactProgressBar;
