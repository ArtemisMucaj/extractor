class Train
  @index = 0
  @click_event = ''
  @classify_talker = ''

  @draw : (message) ->
    canvas_layer = $("#canvasLayer")[0]
    ctx = canvas_layer.getContext("2d")
    ctx.clearRect(0, 0, canvas_layer.width, canvas_layer.height)
    message["data"].forEach (elt) ->
      top = elt["pos"][0]
      bot = elt["pos"][1]
      width = bot["x"] - top["x"]
      height = bot["y"] - top["y"]
      ctx.strokeRect(top["x"],top["y"], width, height)

  @onMessage: (message) ->
    #console.log message.toString()
    image = sharp(TEPicker.urls[Train.index])
    console.log TEPicker.urls[Train.index]
    image.toFormat("png").toBuffer().then (output) ->
      image.metadata().then (meta) ->
        width = meta.width
        height = meta.height
        # render image
        ReactDOM.render(React.createElement(ReactImage,
         data:output,height:height,width:width),
          document.getElementById("image"))
        # switch to detail view
        # render notification box
        # draw on canvas
        message = JSON.parse(message)
        Train.draw(message)
        # show message
        # wait for click here ...
        Train.click_event = $("#canvasLayer").on 'click', (event) ->
          elt = $("#canvasLayer")[0]
          bound = elt.getBoundingClientRect()
          cX = event.clientX - bound.left
          cY = event.clientY - bound.top
          # send index/es of the selected elements
          message["data"].forEach (elt) ->
            top = elt["pos"][0]
            bot = elt["pos"][1]
            if cX >= top["x"] && cX <= bot["x"] &&
            cY >= top["y"] && cY <= bot["y"]
              console.log "Found a match ..."
              elt["class"][0] = "0.0"
              elt["class"][1] = "1.0"
          # on click on validate button : send data to
          # python process
          # Train.classify_talker.send("Got it!")

  @run: () ->
    Train.classify_talker = new Talk(Train.onMessage)
    console.log "Running CorePy.py"
    args = [global.__dirname+
      '/python/CorePy.py']
    core_process = child_p("python", args)
    # Send URLs to Python process
    console.log TEPicker.urls
    Train.classify_talker.send(JSON.stringify(TEPicker.urls))
    # add to subprocess list
    subprocessList.push core_process
    # stderr
    core_process.stderr.on 'data', (data) ->
      console.log("stder: "+ data)
    core_process.stdout.on 'data', (data) ->
      console.log("stdout: "+ data)
    # on 'close'
    core_process.on 'close', (code, signal) ->
      console.log "CorePy process ended ..."
      core_process.exitCode = 1
      Train.classify_talker.close()


module.exports = Train