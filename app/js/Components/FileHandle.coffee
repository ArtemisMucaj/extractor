# FileHandle class :
class FileHandle
  @dragArea
  @pick_button

  @filepath
  @filename

  @file_pick
  @converter

  constructor : (dragArea, pick_button) ->
    FileHandle.setStaticAttr(dragArea, pick_button)
    FileHandle.file_pick = new FilePick(dragArea, pick_button)
    FileHandle.converter = new Converter()

  @setStaticAttr: (a,b) ->
    FileHandle.dragArea = a
    FileHandle.pick_button = b

  @handle: (files) ->
    console.log files
    if files.length > 1
      # body...
      console.log "You selected too many files ..."
    else
      for f in files
        if f.type == "application/pdf"
          console.log "File : correct file type"
          FileHandle.filepath = f.path
          FileHandle.filename = FileHandle.filepath.split("/").
                                  pop().split(".")[0]
          ReactDOM.render(React.createElement(ReactProgressBarLayout,
           description: " Your file is being converted "+
           " - This operationg might take a while ",
           text: " "), document.getElementById("content"))
          # start conversio
          @converter.worker()

module.exports = FileHandle
