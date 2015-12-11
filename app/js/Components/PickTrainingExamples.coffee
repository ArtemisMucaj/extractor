class PickTrainingExamples

  @training_examples = []

  @auto : () ->
    autopick = new Autopick()
    # Run auto_pick_train.py
    console.log "Running auto_pick_train.py"
    args = [global.__dirname+
      '/python/auto_pick_train.py', global.__dirname+"/data/"+
      FileHandle.filename+"/low/"]
    autopick_process = child_p("python", args)
    autopick_process.on 'close', (code, signal) ->
      #PickTrainingExamples.training_examples = autopick.message
      msg = autopick.message.replace('[', '').
      replace(']', '').replace(/ /g,"")
      msg = msg.replace(/'/g,'').split(',')
      for elt in msg
        PickTrainingExamples.training_examples.push global.__dirname+
          "/data/"+FileHandle.filename+"/low/"+elt
      # Render file list
      ReactDOM.render(React.createElement(ReactImagesFromPDF,
       description: "",
       data:PickTrainingExamples.training_examples),
        document.getElementById("content"))
      autopick.close()

  @manual : () ->
    console.log "Manual pick ..."

module.exports = PickTrainingExamples
''
