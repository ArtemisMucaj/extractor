# FileHandle class :
class FileHandle
  @dragArea
  @pick_button
  @filepath
  @filename
  constructor : (dragArea, pick_button) ->
    FileHandle.setStaticAttr(dragArea, pick_button)

  @setStaticAttr: (a,b) ->
    FileHandle.dragArea = a
    FileHandle.pick_button = b

  @handle: (files, converterObj) ->
    if files.length > 1
      # body...
      console.log "You selected too many files ..."
    else
      for f in files
        if f.type == "application/pdf"
          FileHandle.filepath = f.path
          FileHandle.filename = FileHandle.filepath.split("/").
                                  pop().split(".")[0]
          ReactDOM.render(React.createElement(ReactProgressBarLayout,
           description: " Your file is being converted "+
           " - This operationg might take a while ",
           text: " "), document.getElementById("content"))
          # start conversion
          converterObj.worker()

module.exports = FileHandle
