var PickTrainingExamples;

PickTrainingExamples = (function() {
  function PickTrainingExamples() {}

  PickTrainingExamples.urls = [];

  PickTrainingExamples.images = [];

  PickTrainingExamples.auto = function(path) {
    var args, autopick, autopick_process;
    autopick = new Autopick();
    console.log("Running auto_pick_train.py");
    args = [global.__dirname + '/python/auto_pick_train.py', path];
    autopick_process = child_p("python", args);
    subprocessList.push(autopick_process);
    return autopick_process.on('close', function(code, signal) {
      var data, elt, i, im, j, k, len, msg, ref;
      autopick_process.exitCode = 1;
      msg = autopick.message.replace('[', '').replace(']', '').replace(/ /g, "");
      msg = msg.replace(/'/g, '').split(',');
      for (j = 0, len = msg.length; j < len; j++) {
        elt = msg[j];
        PickTrainingExamples.urls.push(global.__dirname + "/data/" + FileHandle.encodedName + "/500x500/" + elt);
      }
      data = [];
      for (i = k = 0, ref = PickTrainingExamples.urls.length; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        console.log("Converting " + i + "th image ...");
        im = sharp(PickTrainingExamples.urls[i]);
        PickTrainingExamples.images.push(im);
        im.resize(200, 200).toFormat('png').toBuffer().then(function(output) {
          data.push(output);
          console.log("Rendering " + i + "th image ...");
          return ReactDOM.render(React.createElement(ReactImageList, {
            description: "",
            data: data
          }), document.getElementById("content"));
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
