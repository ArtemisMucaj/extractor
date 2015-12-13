var PickTrainingExamples;

PickTrainingExamples = (function() {
  function PickTrainingExamples() {}

  PickTrainingExamples.urls = [];

  PickTrainingExamples.images = [];

  PickTrainingExamples.clear = function() {
    PickTrainingExamples.urls = [];
    return PickTrainingExamples.images = [];
  };

  PickTrainingExamples.auto = function(path) {
    var args, autopick, autopick_process;
    PickTrainingExamples.clear();
    autopick = new Autopick();
    console.log("Running auto_pick_train.py");
    args = [global.__dirname + '/python/auto_pick_train.py', path];
    autopick_process = child_p("python", args);
    subprocessList.push(autopick_process);
    autopick_process.stderr.on('data', function(data) {
      return console.log("stder: " + data);
    });
    return autopick_process.on('close', function(code, signal) {
      var data, elt, i, len, msg;
      autopick_process.exitCode = 1;
      msg = JSON.parse(autopick.message.replace(/'/g, '"'));
      for (i = 0, len = msg.length; i < len; i++) {
        elt = msg[i];
        PickTrainingExamples.urls.push(global.__dirname + "/data/" + FileHandle.encodedName + "/raw/" + elt);
      }
      data = [];
      PickTrainingExamples.urls.forEach(function(elt) {
        var image;
        image = sharp(elt);
        return image.resize(75, 75).toFormat("png").toBuffer().then(function(output) {
          data.push([elt, output]);
          return ReactDOM.render(React.createElement(ReactImageList, {
            description: "",
            data: data
          }), document.getElementById("img-list-view"));
        });
      });
      return autopick.close();
    });
  };

  PickTrainingExamples.manual = function(path) {
    return console.log("Manual pick ...");
  };

  return PickTrainingExamples;

})();

module.exports = PickTrainingExamples;
