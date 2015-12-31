# FileHandle class :
class FileHandle
  @dragArea
  @pick_button

  @filepath

  @filename
  @encodedName

  @setStaticAttr: (a,b) ->
    FileHandle.dragArea = a
    FileHandle.pick_button = b

  @render : () ->
    ReactDOM.render(React.createElement(ReactProgressBarLayout,
     description: " Your file is being converted "+
     " - This operationg might take a while ",
     text: " "), document.getElementById("content"))

  @handle: (files, modal) ->
    if files.length > 1
      # dialog
      Dialog.showMessageBox({
      message: "We do not support multiple selection yet!",
      buttons: ["Ok"]})
      console.log "You selected too many files ..."
    else
      for f in files
        if f.type == "application/pdf"
          FileHandle.filepath = f.path
          FileHandle.filename = FileHandle.filepath.split("/").
                                  pop().split(".")[0]
          FileHandle.encodedName = btoa(FileHandle.filename)
          # dialog
          if modal == true
            Dialog.showMessageBox { type:"question",
            title:"Is this the right file ?"
            message: "Is this "+
            "the file you wanted to work with ?",
            detail: FileHandle.filename+".pdf",
            buttons: ["Yes", "No"] }, (index) ->
              # clear inputs
              $(FileHandle.pick_button).val("")
              $("#open-file").val("")
              TEPicker.clear()
              # else
              if index == 0
                # stop everything
                Helper.killSubProcesses(subprocessList)
                FileHandle.render()
                Converter.worker()

          else
            # stop everthing before starting to work with the new file
            $(FileHandle.pick_button).val("")
            $("#open-file").val("")
            TEPicker.clear()
            Helper.killSubProcesses(subprocessList)
            # run
            FileHandle.render()
            Converter.worker()

module.exports = FileHandle
