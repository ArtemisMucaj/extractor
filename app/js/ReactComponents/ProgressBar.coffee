React = require('react')

ReactProgressBar = React.createClass
  displayName : 'FileButton'
  render: ->
    React.DOM.div className : "progress",
      React.DOM.span className : "progress-meter",
        React.DOM.p className : "progress-meter-text", @props.text

module.exports = ReactProgressBar
