class PickTrainingExamples

  @urls = []
  @images = []

  @auto : (path) ->
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
      #PickTrainingExamples.training_examples = autopick.message
      msg = autopick.message.replace('[', '').
      replace(']', '').replace(/ /g,"")
      msg = msg.replace(/'/g,'').split(',')
      for elt in msg
        PickTrainingExamples.urls.push global.__dirname+
          "/data/"+FileHandle.encodedName+"/500x500/"+elt
      # Render file list
      data = []
      for i in [0...PickTrainingExamples.urls.length]
        console.log "Converting "+i+"th image ..."
        im = sharp(PickTrainingExamples.urls[i])
        # Keep image in memory
        PickTrainingExamples.images.push im
        im
        .resize(200,200).toFormat('png').toBuffer().then (output) ->
          data.push output
          # Render
          console.log "Rendering "+i+"th image ..."
          ReactDOM.render(React.createElement(ReactImageList,
           description: "",
           data:data),
            document.getElementById("content"))
      autopick.close()

  @manual : (path) ->
    console.log "Manual pick ..."

module.exports = PickTrainingExamples
