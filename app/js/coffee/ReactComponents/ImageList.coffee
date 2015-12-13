React = require('react')

ReactImageList = React.createClass
  displayName : 'ImageList',
  handleDBClick: (url,i) ->
    () ->
      # create image and display it
      sharp(url).toFormat("png").toBuffer().then (output) ->
        ReactDOM.render(React.createElement(ReactImage,
         data:output),
          document.getElementById("image"))
  ,
  render: ->
    data = @props.data
    that = @
    React.DOM.div className : "align-center",
      React.DOM.div className : "large-12 medium-12",
      idName:"image-list",
        #eat food for food in ['toast', 'cheese', 'wine']
        for i in [0...data.length]
          #console.log(data[i])
          React.DOM.img className:"thumbnail", key:i, id:"img-"+i,
          src:"data:image/png;base64,"+(data[i][1]).toString('base64'),
          onDoubleClick:that.handleDBClick(data[i][0],i)


module.exports = ReactImageList
