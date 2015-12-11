class PickTrainingExamples

  @training_examples = []

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
        PickTrainingExamples.training_examples.push global.__dirname+
          "/data/"+FileHandle.encodedName+"/500x500/"+elt
      # Render file list
      images = []
      for i in [0...PickTrainingExamples.training_examples.length]
        console.log "Converting "+i+"th image ..."
        sharp(PickTrainingExamples.training_examples[i])
        .toFormat('png').toBuffer().then (output) ->
          images.push output
          # Render
          console.log "Rendering "+i+"th image ..."
          ReactDOM.render(React.createElement(ReactImageList,
           description: "",
           data:images),
            document.getElementById("content"))
      autopick.close()

  @manual : (path) ->
    console.log "Manual pick ..."

module.exports = PickTrainingExamples
