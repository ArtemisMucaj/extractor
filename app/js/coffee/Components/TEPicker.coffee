class TEPicker
  # TEPicker for Training examples picker
  @urls = []
  @images = []
  # clear method
  @clear : () ->
    TEPicker.urls = []
    TEPicker.images = []
  # autopicker
  @auto : (path) ->
    TEPicker.clear()
    # Run autopicker
    callback = () ->
    autopick = new Talker(callback)
    # Run auto_pick_train.py
    console.log "Running auto_pick_train.py"
    args = [global.__dirname+
      '/python/Autopick.py', path]
    autopick_process = child_p("python", args)
    # add to subprocess list
    subprocessList.push autopick_process
    # catch on close event
    #autopick_process.stderr.on 'data', (data) ->
    #  console.log("stder: "+ data)
    autopick_process.on 'close', (code, signal) ->
      autopick_process.exitCode = 1
      msg = JSON.parse(autopick.message.replace(/'/g,'"'))
      for elt in msg
        TEPicker.urls.push global.__dirname+
          "/data/"+FileHandle.encodedName+"/raw/"+elt
      # Render file list
      data = []
      TEPicker.urls.forEach (elt) ->
        image = sharp(elt)
        image.resize(75,75).toFormat("png").toBuffer().then (output) ->
          data.push [elt, output]
          ReactDOM.render(React.createElement(ReactImageList,
           description: "",
           data:data),
            document.getElementById("img-list-view"))
      autopick.close()

  # manual picker
  @manual : (path) ->
    console.log "Manual pick ..."

module.exports = TEPicker
