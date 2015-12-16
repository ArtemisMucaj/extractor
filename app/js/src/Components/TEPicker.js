var TEPicker;

TEPicker = (function() {
  function TEPicker() {}

  TEPicker.urls = [];

  TEPicker.images = [];

  TEPicker.clear = function() {
    TEPicker.urls = [];
    return TEPicker.images = [];
  };

  TEPicker.auto = function(path) {
    var args, autopick, autopick_process, callback;
    TEPicker.clear();
    $("#run_autopick")[0].className = "button disabled";
    $("#run_classify")[0].className = "button disabled";
    $("#run_extract")[0].className = "button disabled";
    callback = function() {};
    autopick = new Talk(callback);
    console.log("Running auto_pick_train.py");
    args = [global.__dirname + '/python/Autopick.py', path];
    autopick_process = child_p("python", args);
    subprocessList.push(autopick_process);
    autopick_process.stdout.on('data', function(data) {
      return console.log("stder: " + data);
    });
    autopick_process.stderr.on('data', function(data) {
      return console.log("stder: " + data);
    });
    return autopick_process.on('close', function(code, signal) {
      var data, elt, i, len, msg;
      console.log("Finished executing process");
      autopick_process.exitCode = 1;
      $("#run_autopick")[0].className = "button";
      ($("#run_classify")[0]).className = "button";
      msg = JSON.parse(autopick.message.replace(/'/g, '"'));
      for (i = 0, len = msg.length; i < len; i++) {
        elt = msg[i];
        TEPicker.urls.push(global.__dirname + "/data/" + FileHandle.encodedName + "/raw/" + elt);
      }
      data = [];
      TEPicker.urls.forEach(function(elt) {
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

  TEPicker.manual = function(path) {
    return console.log("Manual pick ...");
  };

  return TEPicker;

})();

module.exports = TEPicker;
