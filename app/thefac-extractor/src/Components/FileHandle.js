var FileHandle;

FileHandle = (function() {
  function FileHandle() {}

  FileHandle.dragArea;

  FileHandle.pick_button;

  FileHandle.filepath;

  FileHandle.filename;

  FileHandle.encodedName;

  FileHandle.setStaticAttr = function(a, b) {
    FileHandle.dragArea = a;
    return FileHandle.pick_button = b;
  };

  FileHandle.render = function() {
    return ReactDOM.render(React.createElement(ReactProgressBarLayout, {
      description: " Your file is being converted " + " - This operationg might take a while ",
      text: " "
    }), document.getElementById("content"));
  };

  FileHandle.handle = function(files, modal) {
    var f, i, len, results;
    if (files.length > 1) {
      Dialog.showMessageBox({
        message: "We do not support multiple selection yet!",
        buttons: ["Ok"]
      });
      return console.log("You selected too many files ...");
    } else {
      results = [];
      for (i = 0, len = files.length; i < len; i++) {
        f = files[i];
        if (f.type === "application/pdf") {
          FileHandle.filepath = f.path;
          FileHandle.filename = FileHandle.filepath.split("/").pop().split(".")[0];
          FileHandle.encodedName = btoa(FileHandle.filename);
          if (modal === true) {
            results.push(Dialog.showMessageBox({
              type: "question",
              title: "Is this the right file ?",
              message: "Is this " + "the file you wanted to work with ?",
              detail: FileHandle.filename + ".pdf",
              buttons: ["Yes", "No"]
            }, function(index) {
              $(FileHandle.pick_button).val("");
              $("#open-file").val("");
              TEPicker.clear();
              if (index === 0) {
                Helper.killSubProcesses(subprocessList);
                FileHandle.render();
                return Converter.worker();
              }
            }));
          } else {
            $(FileHandle.pick_button).val("");
            $("#open-file").val("");
            TEPicker.clear();
            Helper.killSubProcesses(subprocessList);
            FileHandle.render();
            results.push(Converter.worker());
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };

  return FileHandle;

})();

module.exports = FileHandle;
