class Train
  @index = 0
  @click_event = ''
  @classify_talker = ''
  @isRunning = false

  @draw : (message) ->
    canvas_layer = $("#canvasLayer")[0]
    ctx = canvas_layer.getContext("2d")
    ctx.clearRect(0, 0, canvas_layer.width, canvas_layer.height)
    message["data"].forEach (elt) ->
      top = elt["pos"][0]
      bot = elt["pos"][1]
      width = bot["x"] - top["x"]
      height = bot["y"] - top["y"]
      ctx.lineWidth = 2
      ctx.strokeRect(top["x"],top["y"], width, height)
      if elt["class"][0] == "0.0"
        ctx.fillStyle="rgba(243, 228, 103, 0.55)"
        ctx.fillRect(top["x"],top["y"],
        bot["x"] - top["x"],bot["y"] - top["y"])

  @onMessage: (message) ->
    #console.log message.toString()
    $("#validate_classification")[0].className="button hollow"
    image = sharp(TEPicker.urls[Train.index])
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
          canvas = $("#canvasLayer")[0]
          ctx = canvas.getContext("2d")
          bound = canvas.getBoundingClientRect()
          cX = event.clientX - bound.left
          cY = event.clientY - bound.top
          # send index/es of the selected elements
          message["data"].forEach (elt) ->
            top = elt["pos"][0]
            bot = elt["pos"][1]
            if cX >= top["x"] && cX <= bot["x"] &&
            cY >= top["y"] && cY <= bot["y"]
              if elt["class"][0] == "1.0"
                elt["class"][0] = "0.0"
                elt["class"][1] = "1.0"
                ctx.fillStyle="rgba(243, 228, 103, 0.55)"
                ctx.fillRect(top["x"],top["y"],
                bot["x"] - top["x"],bot["y"] - top["y"])
              else if elt["class"][0] == "0.0"
                elt["class"][0] = "1.0"
                elt["class"][1] = "0.0"
                ctx.clearRect(top["x"],top["y"],
                (bot["x"]-top["x"]),(bot["y"]-top["y"]))
                ctx.lineWidth=2
                ctx.strokeRect(top["x"],top["y"],
                bot["x"] - top["x"],bot["y"] - top["y"])
        # on click on validate button : send data to
        # python process
        $("#validate_classification").on 'click', () ->
          #message["data"].forEach (elt) ->
          #  if elt["class"][0] == "0.0"
          #    console.log elt
          #console.log JSON.stringify(message)
          Train.classify_talker.send(JSON.stringify(message))
          #canvas = $("#canvasLayer")[0]
          #ctx = canvas.getContext("2d")
          #ctx.clearRect(0,0,width,height)
          $("#validate_classification")[0].className="button hollow disabled"
          Train.index += 1
          # remove events on click on validation button and on the canvas
          $("#canvasLayer").off 'click'
          $("#validate_classification").off 'click'

  @run: () ->
    Train.index = 0
    Train.isRunning = true
    Train.classify_talker = new Talk(Train.onMessage)
    # keep going
    console.log "Running CorePy.py"
    args = [global.__dirname+
      '/python/CorePy.py']
    core_process = child_p("python", args)
    # Send URLs to Python process
    # console.log TEPicker.urls
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
      # training ended
      Train.isRunning = false
      $("#validate_classification")[0].className="button hollow disabled hide"
      core_process.exitCode = 1
      Train.classify_talker.close()


module.exports = Train
