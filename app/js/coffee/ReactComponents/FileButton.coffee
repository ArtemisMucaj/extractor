React = require('react')

ReactFileButton = React.createClass
  displayName : 'FileButton'
  render: ->
    React.DOM.label className: "center",
      React.DOM.input(className:"hide", id:"btn-file-pick", type:"file"),
      React.DOM.span(className:"button", @props.text)

module.exports = ReactFileButton
