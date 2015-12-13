DragDrop = require('drag-drop')
Remote = require('remote')
Dialog = Remote.require('dialog')
# PDFJS : Work with pdfs
pdfjs = require('pdfjs-dist/build/pdf.combined')
# glob FileSystem
glob = require('glob')
# Spawn child processes
child_p = require('child_process').spawn
fs = require('fs')
os = require('os')
process = require('process')

sharp = require('sharp')

zmq = require('zmq')

# Load UI components
React = require('react')
ReactDOM = require('react-dom')
# Custom UI
ReactFileButton = require "../app/js/src/ReactComponents/FileButton"
ReactProgressBar = require "../app/js/src/ReactComponents/ProgressBar"
ReactFileSelectorLayout = require "../app/js/src/ReactComponents/"+"
    FileSelectorLayout"
ReactProgressBarLayout = require "../app/js/src/ReactComponents/"+"
    ProgressBarLayout"

ReactImage = require "../app/js/src/ReactComponents/"+"
    Image"
ReactImageList = require "../app/js/src/ReactComponents/"+"
    ImageList"

# Load regular Components

Helper = require('../app/js/src/Components/Helper')

Talker = require('../app/js/src/Components/Talker')
TEPicker = require('../app/js/src/Components/TEPicker')

ProgressBar = require('../app/js/src/Components/ProgressBar')
ResizeableDivider = require('../app/js/src/Components/ResizeableDivider')

FilePick = require('../app/js/src/Components/FilePick')
ConversionHelper = require('../app/js/src/Components/ConversionHelper')
Converter = require('../app/js/src/Components/Converter')
FileHandle = require('../app/js/src/Components/FileHandle')

Extractor = require('../app/js/src/Extractor')

subprocessList = []
Helper.killSubProcessesOnExit(subprocessList)

resizeablePane = new ResizeableDivider('.mainWindow', '.dragDivider',
'.previsualize','vertical', 40, 10)

main_loop = new Extractor()

# Test with Train
$("#run_classify").on 'click', () ->
  onMessage = (m) ->
    first = JSON.parse(m)
    console.log first
  # show image
  url = global.__dirname+"/python/images/test.tif"
  sharp(url).toFormat("png").toBuffer().then (output) ->
    ReactDOM.render(React.createElement(ReactImage,
     data:output),
      document.getElementById("image"))

  # run classification
  classify = new Talker(onMessage)
  console.log "Running CorePy.py"
  args = [global.__dirname+
    '/python/CorePy.py', url]
  core_process = child_p("python", args)
  # add to subprocess list
  subprocessList.push core_process
  # stderr
  core_process.stderr.on 'data', (data) ->
    console.log("stder: "+ data)
  core_process.stdout.on 'data', (data) ->
    console.log("stdout: "+ data)
  # on 'close'
  core_process.on 'close', (code, signal) ->
    console.log "CorePy process ended ..."
    core_process.exitCode = 1