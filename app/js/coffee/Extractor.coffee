class Extractor
  constructor : () ->
    # PDF-to-PNG converter class
    @converter = new Converter()
    @file_handle = new FileHandle("body","#btn-file-pick")
    @file_picker = new FilePick(FileHandle.dragArea,
     FileHandle.pick_button, @converter)

module.exports = Extractor
