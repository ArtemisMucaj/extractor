var PickTrainingExamples;

PickTrainingExamples = (function() {
  function PickTrainingExamples() {}

  PickTrainingExamples.training_examples = [];

  PickTrainingExamples.auto = function() {
    var args, autopick, autopick_process;
    autopick = new Autopick();
    console.log("Running auto_pick_train.py");
    args = [global.__dirname + '/python/auto_pick_train.py', global.__dirname + "/data/" + FileHandle.filename + "/low/"];
    autopick_process = child_p("python", args);
    return autopick_process.on('close', function(code, signal) {
      var elt, i, len, msg;
      msg = autopick.message.replace('[', '').replace(']', '').replace(/ /g, "");
      msg = msg.replace(/'/g, '').split(',');
      for (i = 0, len = msg.length; i < len; i++) {
        elt = msg[i];
        PickTrainingExamples.training_examples.push(global.__dirname + "/data/" + FileHandle.filename + "/low/" + elt);
      }
      ReactDOM.render(React.createElement(ReactImagesFromPDF, {
        description: "",
        data: PickTrainingExamples.training_examples
      }), document.getElementById("content"));
      return autopick.close();
    });
  };

  PickTrainingExamples.manual = function() {
    return console.log("Manual pick ...");
  };

  return PickTrainingExamples;

})();

module.exports = PickTrainingExamples;

'';
