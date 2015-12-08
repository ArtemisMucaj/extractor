# FilePick class :
class FilePick
  constructor : (@dragArea, @pick_button) ->
    @setPicker()
    @button = @createButton()

  setPicker: () ->
    @drag = DragDrop(@dragArea, (files,pos) ->
      FileHandle.handle(files))
    ReactDOM.render(React.createElement(ReactFileSelectorLayout,
     description: " Choose a .pdf file to work with"+
     " - You can either drop it in the window or use the regular button ",
     text: "Select a file (.pdf only)"),
     document.getElementById("content"))

  createButton: () ->
    button = $(@pick_button)
    button.on('change', (event) ->
      files = event.target.files
      FileHandle.handle(files)
     )
    return button


module.exports = FilePick
