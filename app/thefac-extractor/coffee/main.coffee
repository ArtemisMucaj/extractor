glob = require 'glob'
DragDrop = require('drag-drop')
child_p = require('child_process').spawn

sharp = require 'sharp'
zmq = require 'zmq'
PDF = require 'pdfinfo'

ReactFileButton = require "./thefac-extractor/src/ReactComponents/"+"
FileButton"
ReactProgressBar = require "./thefac-extractor/src/ReactComponents/"+
"ProgressBar"
ReactFileSelectorLayout = require "./thefac-extractor/src/"+
"ReactComponents/"+"
    FileSelectorLayout"
ReactProgressBarLayout = require "./thefac-extractor/src/ReactComponents/"+
"ProgressBarLayout"

ReactImage = require "./thefac-extractor/src/ReactComponents/"+"
    Image"
ReactImageList = require "./thefac-extractor/src/ReactComponents/"+"
    ImageList"

# Load regular Components
Helper = require('./thefac-extractor/src/Components/Helper')
Talk = require('./thefac-extractor/src/Components/Talk')
TEPicker = require('./thefac-extractor/src/Components/TEPicker')
Train = require('./thefac-extractor/src/Components/Train')
ProgressBar = require('./thefac-extractor/src/Components/ProgressBar')
ResizeableDivider = require('./thefac-extractor/src/'+
'Components/ResizeableDivider')
FilePick = require('./thefac-extractor/src/Components/FilePick')
ConversionHelper = require('./thefac-extractor/src/Components/ConversionHelper')
Converter = require('./thefac-extractor/src/Components/Converter')
FileHandle = require('./thefac-extractor/src/Components/FileHandle')

# set fileHandle's attributes
FileHandle.setStaticAttr("body", "#btn-file-pick")
# initialize file picker
file_picker = new FilePick(FileHandle.dragArea,
 FileHandle.pick_button)

subprocessList = []
Helper.killSubProcessesOnExit(subprocessList)

resizeablePane = new ResizeableDivider('.mainWindow', '.dragDivider',
'.previsualize','vertical', 40, 10)

$("#run_classify").on 'click', () ->
  Train.run()
  $("#validate_classification")[0].className = "button hollow"
  toggle_tabs = new Foundation.Tabs($(".tabs"))
  toggle_tabs.selectTab($("#details"))


# main_loop = new Extractor()
