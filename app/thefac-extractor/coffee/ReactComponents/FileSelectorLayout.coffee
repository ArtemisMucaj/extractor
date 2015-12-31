ReactFileSelectorLayout = React.createClass
  displayName : 'FileSelectorLayout'
  render: ->
    React.DOM.div className : "row align-center margin-top-3",
      React.DOM.div className : "large-8 medium-8 columns center",
        React.DOM.p null, @props.description,
      React.DOM.div className : "large-8 medium-8 columns",
        React.createElement ReactFileButton, text:@props.text

module.exports = ReactFileSelectorLayout
