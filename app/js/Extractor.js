var Extractor;

Extractor = (function() {
  function Extractor() {
    this.converter = new Converter();
    this.file_handle = new FileHandle("body", "#btn-file-pick");
    this.file_picker = new FilePick(FileHandle.dragArea, FileHandle.pick_button, this.converter);
  }

  return Extractor;

})();

module.exports = Extractor;
