class PickTrainingExamples

  @urls = []
  @images = []

  @clear : () ->
    PickTrainingExamples.urls = []
    PickTrainingExamples.images = []

  @auto : (path) ->
    PickTrainingExamples.clear()
    # Run autopicker
    autopick = new Autopick()
    # Run auto_pick_train.py
    console.log "Running auto_pick_train.py"
    args = [global.__dirname+
      '/python/auto_pick_train.py', path]
    autopick_process = child_p("python", args)
    # add to subprocess list
    subprocessList.push autopick_process
    # catch on close event
    autopick_process.on 'close', (code, signal) ->
      autopick_process.exitCode = 1
      msg = JSON.parse(autopick.message.replace(/'/g,'"'))
      for elt in msg
        PickTrainingExamples.urls.push global.__dirname+
          "/data/"+FileHandle.encodedName+"/raw/"+elt
      # Render file list
      data = []
      for i in [0...PickTrainingExamples.urls.length]
        im = sharp(PickTrainingExamples.urls[i])
        # Keep image in memory
        PickTrainingExamples.images.push im
        im
        .resize(75,75).toFormat('png').toBuffer().then (output) ->
          data.push output
          # Render
          ReactDOM.render(React.createElement(ReactImageList,
           description: "",
           data:data),
            document.getElementById("img-list-view"))

      autopick.close()

  @manual : (path) ->
    console.log "Manual pick ..."

module.exports = PickTrainingExamples
