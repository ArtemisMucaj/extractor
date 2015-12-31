var ReactImage;

ReactImage = React.createClass({
  displayName: "Image",
  render: function() {
    return React.DOM.div(null, React.DOM.img({
      className: "img-layer thumbnail",
      key: 1,
      src: "data:image/png;base64," + this.props.data.toString('base64')
    }), React.DOM.canvas({
      className: "canvas-layer thumbnail",
      id: "canvasLayer",
      width: this.props.width,
      height: this.props.height
    }));
  }
});

module.exports = ReactImage;
