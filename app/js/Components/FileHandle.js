var FileHandle;

FileHandle = (function() {
  FileHandle.dragArea;

  FileHandle.pick_button;

  FileHandle.filepath;

  FileHandle.filename;

  FileHandle.file_pick;

  FileHandle.converter;

  function FileHandle(dragArea, pick_button) {
    FileHandle.setStaticAttr(dragArea, pick_button);
    FileHandle.file_pick = new FilePick(dragArea, pick_button);
    FileHandle.converter = new Converter();
  }

  FileHandle.setStaticAttr = function(a, b) {
    FileHandle.dragArea = a;
    return FileHandle.pick_button = b;
  };

  FileHandle.handle = function(files) {
    var f, i, len, results;
    console.log(files);
    if (files.length > 1) {
      return console.log("You selected too many files ...");
    } else {
      results = [];
      for (i = 0, len = files.length; i < len; i++) {
        f = files[i];
        if (f.type === "application/pdf") {
          console.log("File : correct file type");
          FileHandle.filepath = f.path;
          FileHandle.filename = FileHandle.filepath.split("/").pop().split(".")[0];
          ReactDOM.render(React.createElement(ReactProgressBarLayout, {
            description: " Your file is being converted " + " - This operationg might take a while ",
            text: " "
          }), document.getElementById("content"));
          results.push(this.converter.worker());
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
