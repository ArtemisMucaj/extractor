class TEPicker
  # TEPicker for Training examples picker
  @urls = []
  @talker = null
  @process = null

  # clear method
  @clear : () ->
    TEPicker.urls = []
    TEPicker.talker = null
    TEPicker.process = null
  # autopicker
  @auto : (path) ->
    TEPicker.clear()
    # disable buttons for now
    $("#run_autopick")[0].className ="button disabled"
    $("#run_classify")[0].className ="button disabled"
    $("#run_extract")[0].className ="button disabled"
    # Run autopicker
    callback = () ->
    TEPicker.talker = new Talk(callback)
    # Run auto_pick_train.py
    console.log "Running auto_pick_train.py"

    args = [global.__dirname+
      '/thefac-extractor/python/Autopick.py', path]

    TEPicker.process = child_p("python", args)

    # add to subprocess list
    # subprocessList.push TEPicker.process

    #TEPicker.process.stdout.on 'data', (data) ->
    #  console.log("stdout: "+ data)
    # catch on close event
    #TEPicker.process.stderr.on 'data', (data) ->
    #  console.log("stder: "+ data)

    TEPicker.process.on 'close', (code, signal) ->
      # get new message
      msg = JSON.parse(TEPicker.talker.message.replace(/'/g,'"'))
      for elt in msg
        TEPicker.urls.push global.__dirname+
          "/../data/"+FileHandle.encodedName+"/raw/"+elt
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

    TEPicker.process.on 'exit', (code, signal) ->
      console.log "Finished executing process"
      console.log('child process terminated due to receipt of signal '
      +signal+' and code '+code)
      # after we close the sockets we can use the button
      TEPicker.talker.close()
      TEPicker.process.kill()
      $("#run_autopick")[0].className ="button"
      $("#run_classify")[0].className = "button"

  # manual picker
  @manual : (path) ->
    console.log "Manual pick ..."

module.exports = TEPicker
