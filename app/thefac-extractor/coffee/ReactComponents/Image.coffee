ReactImage = React.createClass
  displayName:"Image",
  render: ->
    React.DOM.div null,
      React.DOM.img className:"img-layer thumbnail", key:1,
      src:"data:image/png;base64,"+(@props.data).
      toString('base64')
      React.DOM.canvas className:"canvas-layer thumbnail", id:"canvasLayer",
      width:@props.width,
      height:@props.height

module.exports = ReactImage
