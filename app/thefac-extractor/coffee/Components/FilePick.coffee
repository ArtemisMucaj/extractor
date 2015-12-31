# FilePick class :
class FilePick
  constructor : (@dragArea, @pick_button, converterObj) ->
    @setPicker(converterObj)
    @button = @createButton(@pick_button)
    @open = @createButton("#open-file")

  setPicker: () ->
    @drag = DragDrop(@dragArea, (files,pos) ->
      FileHandle.handle(files, true))
    ReactDOM.render(React.createElement(ReactFileSelectorLayout,
     description: " Choose a .pdf file to work with"+
     " - You can either drop it in the window or use the regular button ",
     text: "Select a file (.pdf only)"),
     document.getElementById("content"))

  createButton: (where) ->
    button = $(where)
    button.on('change', (event) ->
      files = event.target.files
      FileHandle.handle(files, false)
     )
    return button


module.exports = FilePick
