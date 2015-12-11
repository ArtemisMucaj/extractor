var FileHandle;

FileHandle = (function() {
  FileHandle.dragArea;

  FileHandle.pick_button;

  FileHandle.filepath;

  FileHandle.filename;

  FileHandle.encodedName;

  function FileHandle(dragArea, pick_button) {
    FileHandle.setStaticAttr(dragArea, pick_button);
  }

  FileHandle.setStaticAttr = function(a, b) {
    FileHandle.dragArea = a;
    return FileHandle.pick_button = b;
  };

  FileHandle.handle = function(files, converterObj) {
    var f, i, len, results;
    if (files.length > 1) {
      return console.log("You selected too many files ...");
    } else {
      results = [];
      for (i = 0, len = files.length; i < len; i++) {
        f = files[i];
        if (f.type === "application/pdf") {
          FileHandle.filepath = f.path;
          FileHandle.filename = FileHandle.filepath.split("/").pop().split(".")[0];
          FileHandle.encodedName = btoa(FileHandle.filename);
          ReactDOM.render(React.createElement(ReactProgressBarLayout, {
            description: " Your file is being converted " + " - This operationg might take a while ",
            text: " "
          }), document.getElementById("content"));
          results.push(converterObj.worker());
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
