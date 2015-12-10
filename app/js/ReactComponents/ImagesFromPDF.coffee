React = require('react')

ReactImagesFromPDF = React.createClass
  displayName : 'ImagesFromPDF',
  render: ->
    data = @props.data
    React.DOM.div className : "row align-center",
      React.DOM.div className : "large-12 medium-12 columns center",
        React.DOM.p null, @props.description,
      React.DOM.div className : "large-12 medium-12 columns",
        for i in [0...data.length]
          React.DOM.img className:"", key:i, src:data[i]

module.exports = ReactImagesFromPDF
