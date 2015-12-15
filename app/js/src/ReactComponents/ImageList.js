var React, ReactImageList;

React = require('react');

ReactImageList = React.createClass({
  displayName: 'ImageList',
  handleDBClick: function(url, i) {
    return function() {
      var image;
      if (Train.isRunning !== true) {
        console.log("double clicked");
        image = sharp(url);
        return image.toFormat("png").toBuffer().then(function(output) {
          return image.metadata().then(function(meta) {
            var height, toggle_tabs, width;
            width = meta.width;
            height = meta.height;
            toggle_tabs = new Foundation.Tabs($(".tabs"));
            toggle_tabs.selectTab($("#details"));
            return ReactDOM.render(React.createElement(ReactImage, {
              data: output,
              width: width,
              height: height
            }), document.getElementById("image"));
          });
        });
      }
    };
  },
  render: function() {
    var data, evt, i, that;
    data = this.props.data;
    that = this;
    return React.DOM.div({
      className: "row align-center",
      style: {
        "maxWidth": "100%"
      },
      idName: "image-list"
    }, (function() {
      var j, ref, results;
      results = [];
      for (i = j = 0, ref = data.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        evt = that.handleDBClick(data[i][0], i);
        results.push(React.DOM.img({
          className: "thumbnail",
          key: i,
          id: "img-" + i,
          src: "data:image/png;base64," + data[i][1].toString('base64'),
          onClick: evt,
          style: {
            'maxWidth': '150px'
          }
        }));
      }
      return results;
    })());
  }
});

module.exports = ReactImageList;
