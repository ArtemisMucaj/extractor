var TEPicker;

TEPicker = (function() {
  function TEPicker() {}

  TEPicker.urls = [];

  TEPicker.talker = null;

  TEPicker.process = null;

  TEPicker.clear = function() {
    TEPicker.urls = [];
    TEPicker.talker = null;
    return TEPicker.process = null;
  };

  TEPicker.auto = function(path) {
    var args, callback;
    TEPicker.clear();
    $("#run_autopick")[0].className = "button disabled";
    $("#run_classify")[0].className = "button disabled";
    $("#run_extract")[0].className = "button disabled";
    callback = function() {};
    TEPicker.talker = new Talk(callback);
    console.log("Running auto_pick_train.py");
    args = [global.__dirname + '/thefac-extractor/python/Autopick.py', path];
    TEPicker.process = child_p("python", args);
    TEPicker.process.on('close', function(code, signal) {
      var data, elt, i, len, msg;
      msg = JSON.parse(TEPicker.talker.message.replace(/'/g, '"'));
      for (i = 0, len = msg.length; i < len; i++) {
        elt = msg[i];
        TEPicker.urls.push(global.__dirname + "/../data/" + FileHandle.encodedName + "/raw/" + elt);
      }
      data = [];
      return TEPicker.urls.forEach(function(elt) {
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
    });
    return TEPicker.process.on('exit', function(code, signal) {
      console.log("Finished executing process");
      console.log('child process terminated due to receipt of signal ', +signal + ' and code ' + code);
      TEPicker.talker.close();
      TEPicker.process.kill();
      $("#run_autopick")[0].className = "button";
      return $("#run_classify")[0].className = "button";
    });
  };

  TEPicker.manual = function(path) {
    return console.log("Manual pick ...");
  };

  return TEPicker;

})();

module.exports = TEPicker;
