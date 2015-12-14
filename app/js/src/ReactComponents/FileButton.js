var React, ReactFileButton;

React = require('react');

ReactFileButton = React.createClass({
  displayName: 'FileButton',
  render: function() {
    return React.DOM.label({
      className: "center"
    }, React.DOM.input({
      className: "hide",
      id: "btn-file-pick",
      type: "file"
    }), React.DOM.span({
      className: "button hollow"
    }, this.props.text));
  }
});

module.exports = ReactFileButton;
