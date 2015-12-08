var FilePick;

FilePick = (function() {
  function FilePick(dragArea, pick_button) {
    this.dragArea = dragArea;
    this.pick_button = pick_button;
    this.setPicker();
    this.button = this.createButton();
  }

  FilePick.prototype.setPicker = function() {
    this.drag = DragDrop(this.dragArea, function(files, pos) {
      return FileHandle.handle(files);
    });
    return ReactDOM.render(React.createElement(ReactFileSelectorLayout, {
      description: " Choose a .pdf file to work with" + " - You can either drop it in the window or use the regular button ",
      text: "Select a file (.pdf only)"
    }), document.getElementById("content"));
  };

  FilePick.prototype.createButton = function() {
    var button;
    button = $(this.pick_button);
    button.on('change', function(event) {
      var files;
      files = event.target.files;
      return FileHandle.handle(files);
    });
    return button;
  };

  return FilePick;

})();

module.exports = FilePick;
