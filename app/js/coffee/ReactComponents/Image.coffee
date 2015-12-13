React = require('react')

ReactImage = React.createClass
  displayName:"Image",
  render: ->
    React.DOM.div null,
      React.DOM.img className:"thumbnail", id:1,
      src:"data:image/png;base64,"+(@props.data).
      toString('base64')

module.exports = ReactImage
