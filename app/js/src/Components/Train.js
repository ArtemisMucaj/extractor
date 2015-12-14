var Train;

Train = (function() {
  function Train() {}

  Train.index = 0;

  Train.click_event = '';

  Train.classify_talker = '';

  Train.draw = function(message) {
    var canvas_layer, ctx;
    canvas_layer = $("#canvasLayer")[0];
    ctx = canvas_layer.getContext("2d");
    ctx.clearRect(0, 0, canvas_layer.width, canvas_layer.height);
    return message["data"].forEach(function(elt) {
      var bot, height, top, width;
      top = elt["pos"][0];
      bot = elt["pos"][1];
      width = bot["x"] - top["x"];
      height = bot["y"] - top["y"];
      ctx.lineWidth = 2;
      ctx.strokeRect(top["x"], top["y"], width, height);
      if (elt["class"][0] === "0.0") {
        ctx.fillStyle = "rgba(243, 228, 103, 0.55)";
        return ctx.fillRect(top["x"], top["y"], bot["x"] - top["x"], bot["y"] - top["y"]);
      }
    });
  };

  Train.onMessage = function(message) {
    var image;
    $("#validate_classification")[0].className = "button hollow";
    image = sharp(TEPicker.urls[Train.index]);
    return image.toFormat("png").toBuffer().then(function(output) {
      return image.metadata().then(function(meta) {
        var height, width;
        width = meta.width;
        height = meta.height;
        ReactDOM.render(React.createElement(ReactImage, {
          data: output,
          height: height,
          width: width
        }), document.getElementById("image"));
        message = JSON.parse(message);
        Train.draw(message);
        Train.click_event = $("#canvasLayer").on('click', function(event) {
          var bound, cX, cY, canvas, ctx;
          canvas = $("#canvasLayer")[0];
          ctx = canvas.getContext("2d");
          bound = canvas.getBoundingClientRect();
          cX = event.clientX - bound.left;
          cY = event.clientY - bound.top;
          return message["data"].forEach(function(elt) {
            var bot, top;
            top = elt["pos"][0];
            bot = elt["pos"][1];
            if (cX >= top["x"] && cX <= bot["x"] && cY >= top["y"] && cY <= bot["y"]) {
              if (elt["class"][0] === "1.0") {
                elt["class"][0] = "0.0";
                elt["class"][1] = "1.0";
                ctx.fillStyle = "rgba(243, 228, 103, 0.55)";
                return ctx.fillRect(top["x"], top["y"], bot["x"] - top["x"], bot["y"] - top["y"]);
              } else if (elt["class"][0] === "0.0") {
                elt["class"][0] = "1.0";
                elt["class"][1] = "0.0";
                return ctx.clearRect(top["x"], top["y"], bot["x"] - top["x"], bot["y"] - top["y"]);
              }
            }
          });
        });
        return $("#validate_classification").on('click', function() {
          Train.classify_talker.send(JSON.stringify(message));
          $("#validate_classification")[0].className = "button hollow disabled";
          Train.index += 1;
          $("#canvasLayer").off('click');
          return $("#validate_classification").off('click');
        });
      });
    });
  };

  Train.run = function() {
    var args, core_process;
    Train.index = 0;
    Train.classify_talker = new Talk(Train.onMessage);
    console.log("Running CorePy.py");
    args = [global.__dirname + '/python/CorePy.py'];
    core_process = child_p("python", args);
    Train.classify_talker.send(JSON.stringify(TEPicker.urls));
    subprocessList.push(core_process);
    core_process.stderr.on('data', function(data) {
      return console.log("stder: " + data);
    });
    core_process.stdout.on('data', function(data) {
      return console.log("stdout: " + data);
    });
    return core_process.on('close', function(code, signal) {
      console.log("CorePy process ended ...");
      core_process.exitCode = 1;
      return Train.classify_talker.close();
    });
  };

  return Train;

})();

module.exports = Train;
