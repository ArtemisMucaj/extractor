var React, ReactImagesFromPDF;

React = require('react');

ReactImagesFromPDF = React.createClass({
  displayName: 'ImagesFromPDF',
  render: function() {
    var data, i;
    data = this.props.data;
    return React.DOM.div({
      className: "row align-center"
    }, React.DOM.div({
      className: "large-12 medium-12 columns center"
    }, React.DOM.p(null, this.props.description)), React.DOM.div({
      className: "large-12 medium-12 columns"
    }, (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        results.push(React.DOM.img({
          className: "",
          key: i,
          src: data[i]
        }));
      }
      return results;
    })()));
  }
});

module.exports = ReactImagesFromPDF;
