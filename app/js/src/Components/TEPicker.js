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
    var args, autopick, autopick_process;
    TEPicker.clear();
    autopick = new Autopick();
    console.log("Running auto_pick_train.py");
    args = [global.__dirname + '/python/auto_pick_train.py', path];
    autopick_process = child_p("python", args);
    subprocessList.push(autopick_process);
    return autopick_process.on('close', function(code, signal) {
      var data, elt, i, len, msg;
      autopick_process.exitCode = 1;
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
