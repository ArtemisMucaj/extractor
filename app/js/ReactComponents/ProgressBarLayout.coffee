React = require('react')
ReactDOM = require('react-dom')

ReactProgressBarLayout = React.createClass
  displayName : 'ProgressBarLayout'
  render: ->
    React.DOM.div className : "row align-center margin-top-3",
      React.DOM.div className : "large-8 medium-8 columns center",
        React.DOM.p null, @props.description,
      React.DOM.div className : "large-8 medium-8 columns",
        React.createElement ReactProgressBar, text:@props.text
      React.DOM.div className : "large-8 medium-8 columns",
        React.DOM.div className: "spinner loader",
          React.DOM.div className: "double-bounce1"
          React.DOM.div className: "double-bounce2"


module.exports = ReactProgressBarLayout
