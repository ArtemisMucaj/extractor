var React, ReactDOM, ReactProgressBarLayout;

React = require('react');

ReactDOM = require('react-dom');

ReactProgressBarLayout = React.createClass({
  displayName: 'ProgressBarLayout',
  render: function() {
    return React.DOM.div({
      className: "row align-center margin-top-3"
    }, React.DOM.div({
      className: "large-8 medium-8 columns center"
    }, React.DOM.p(null, this.props.description)), React.DOM.div({
      className: "large-8 medium-8 columns"
    }, React.createElement(ReactProgressBar, {
      text: this.props.text
    })));
  }
});

module.exports = ReactProgressBarLayout;
