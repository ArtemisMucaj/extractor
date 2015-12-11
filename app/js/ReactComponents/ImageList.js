var React, ReactImageList;

React = require('react');

ReactImageList = React.createClass({
  displayName: 'ImageList',
  render: function() {
    var data, i;
    data = this.props.data;
    return React.DOM.div({
      className: "row align-center"
    }, React.DOM.div({
      className: "large-12 medium-12 columns center"
    }, React.DOM.p(null, this.props.description)), React.DOM.div({
      className: "large-12 medium-12 columns",
      idName: "image-list"
    }, (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        results.push(React.DOM.img({
          className: "",
          key: i,
          src: "data:image/png;base64," + data[i].toString('base64')
        }));
      }
      return results;
    })()));
  }
});

module.exports = ReactImageList;
