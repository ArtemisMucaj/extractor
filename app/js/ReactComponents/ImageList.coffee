React = require('react')

ReactImageList = React.createClass
  displayName : 'ImageList',
  render: ->
    data = @props.data
    React.DOM.div className : "row align-center",
      React.DOM.div className : "large-12 medium-12 columns center",
        React.DOM.p null, @props.description,
      React.DOM.div className : "large-12 medium-12 columns",
      idName:"image-list",
        #eat food for food in ['toast', 'cheese', 'wine']
        for i in [0...data.length]
          React.DOM.img className:"", key:i,
          src:"data:image/png;base64,"+(data[i]).toString('base64')

module.exports = ReactImageList
