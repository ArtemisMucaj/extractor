# FilePick class :
class FilePick
  constructor : (@dragArea, @pick_button, converterObj) ->
    @setPicker(converterObj)
    @button = @createButton(converterObj, @pick_button)
    @open = @createButton(converterObj,"#open-file")
    #@open.on 'click', () ->
    #  Dialog.showOpenDialog { filters: [{ name: 'application/pdf', extensions: ['pdf'] }
    #  ]}, (files) ->
    #    console.log f
    #    FileHandle.handle(files, converterObj, true)


  setPicker: (converterObj) ->
    @drag = DragDrop(@dragArea, (files,pos) ->
      FileHandle.handle(files, converterObj, true))
    ReactDOM.render(React.createElement(ReactFileSelectorLayout,
     description: " Choose a .pdf file to work with"+
     " - You can either drop it in the window or use the regular button ",
     text: "Select a file (.pdf only)"),
     document.getElementById("content"))

  createButton: (converterObj, where) ->
    button = $(where)
    button.on('change', (event) ->
      files = event.target.files
      FileHandle.handle(files, converterObj, false)
     )
    return button


module.exports = FilePick
