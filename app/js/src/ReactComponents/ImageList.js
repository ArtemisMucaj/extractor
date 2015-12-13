var React, ReactImage, ReactImageList;

React = require('react');

ReactImage = React.createClass({
  displayName: "Image",
  render: function() {
    return React.DOM.div(null, React.DOM.img({
      className: "thumbnail",
      id: 1,
      src: "data:image/png;base64," + this.props.data.toString('base64')
    }));
  }
});

ReactImageList = React.createClass({
  displayName: 'ImageList',
  handleDBClick: function(url, i) {
    return function() {
      return sharp(url).toFormat("png").toBuffer().then(function(output) {
        return ReactDOM.render(React.createElement(ReactImage, {
          data: output
        }), document.getElementById("image"));
      });
    };
  },
  render: function() {
    var data, i, that;
    data = this.props.data;
    that = this;
    return React.DOM.div({
      className: "align-center"
    }, React.DOM.div({
      className: "large-12 medium-12",
      idName: "image-list"
    }, (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        results.push(React.DOM.img({
          className: "thumbnail",
          key: i,
          id: "img-" + i,
          src: "data:image/png;base64," + data[i][1].toString('base64'),
          onDoubleClick: that.handleDBClick(data[i][0], i)
        }));
      }
      return results;
    })()));
  }
});

module.exports = ReactImageList;
