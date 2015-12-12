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
      var data, elt, i, im, j, k, len, msg, ref;
      autopick_process.exitCode = 1;
      msg = JSON.parse(autopick.message.replace(/'/g, '"'));
      for (j = 0, len = msg.length; j < len; j++) {
        elt = msg[j];
        PickTrainingExamples.urls.push(global.__dirname + "/data/" + FileHandle.encodedName + "/raw/" + elt);
      }
      data = [];
      for (i = k = 0, ref = PickTrainingExamples.urls.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        im = sharp(PickTrainingExamples.urls[i]);
        PickTrainingExamples.images.push(im);
        sharp(PickTrainingExamples.urls[i]).resize(75, 75).toFormat('png').toBuffer().then(function(output) {
          data.push(output);
          console.log(output.length);
          return ReactDOM.render(React.createElement(ReactImageList, {
            description: "",
            data: data
          }), document.getElementById("img-list-view"));
        });
      }
      return autopick.close();
    });
  };

  PickTrainingExamples.manual = function(path) {
    return console.log("Manual pick ...");
  };

  return PickTrainingExamples;

})();

module.exports = PickTrainingExamples;
