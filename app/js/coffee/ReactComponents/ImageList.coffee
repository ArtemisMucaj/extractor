React = require('react')

ReactImageList = React.createClass
  displayName : 'ImageList',
  handleDBClick: (url,i) ->
    () ->
      console.log "double clicked"
      # create image and display it
      image = sharp(url)
      image.toFormat("png").toBuffer().then (output) ->
        image.metadata().then (meta) ->
          width = meta.width
          height = meta.height
          # toggle details page (?)
          toggle_tabs = new Foundation.Tabs($(".tabs"))
          toggle_tabs.selectTab($("#details"))
          # Render image-list
          ReactDOM.render(React.createElement(ReactImage,
           data:output, width:width, height:height),
            document.getElementById("image"))
  ,
  render: ->
    data = @props.data
    that = @
    React.DOM.div className : "row align-center", style:{"maxWidth":"100%"},
    idName:"image-list",
      #eat food for food in ['toast', 'cheese', 'wine']
      for i in [0...data.length]
        #console.log(data[i])
        React.DOM.img className:"thumbnail", key:i, id:"img-"+i,
        src:"data:image/png;base64,"+(data[i][1]).toString('base64'),
        onClick:that.handleDBClick(data[i][0],i),
        style:{'maxWidth':'150px'}


module.exports = ReactImageList
