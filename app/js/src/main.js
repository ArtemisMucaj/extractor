var ConversionHelper, Converter, Dialog, DragDrop, Extractor, FileHandle, FilePick, Helper, ProgressBar, React, ReactDOM, ReactFileButton, ReactFileSelectorLayout, ReactImage, ReactImageList, ReactProgressBar, ReactProgressBarLayout, Remote, ResizeableDivider, TEPicker, Talker, child_p, fs, glob, main_loop, os, pdfjs, process, resizeablePane, sharp, subprocessList, zmq;

DragDrop = require('drag-drop');

Remote = require('remote');

Dialog = Remote.require('dialog');

pdfjs = require('pdfjs-dist/build/pdf.combined');

glob = require('glob');

child_p = require('child_process').spawn;

fs = require('fs');

os = require('os');

process = require('process');

sharp = require('sharp');

zmq = require('zmq');

React = require('react');

ReactDOM = require('react-dom');

ReactFileButton = require("../app/js/src/ReactComponents/FileButton");

ReactProgressBar = require("../app/js/src/ReactComponents/ProgressBar");

ReactFileSelectorLayout = require("../app/js/src/ReactComponents/" + "FileSelectorLayout");

ReactProgressBarLayout = require("../app/js/src/ReactComponents/" + "ProgressBarLayout");

ReactImage = require("../app/js/src/ReactComponents/" + "Image");

ReactImageList = require("../app/js/src/ReactComponents/" + "ImageList");

Helper = require('../app/js/src/Components/Helper');

Talker = require('../app/js/src/Components/Talker');

TEPicker = require('../app/js/src/Components/TEPicker');

ProgressBar = require('../app/js/src/Components/ProgressBar');

ResizeableDivider = require('../app/js/src/Components/ResizeableDivider');

FilePick = require('../app/js/src/Components/FilePick');

ConversionHelper = require('../app/js/src/Components/ConversionHelper');

Converter = require('../app/js/src/Components/Converter');

FileHandle = require('../app/js/src/Components/FileHandle');

Extractor = require('../app/js/src/Extractor');

subprocessList = [];

Helper.killSubProcessesOnExit(subprocessList);

resizeablePane = new ResizeableDivider('.mainWindow', '.dragDivider', '.previsualize', 'vertical', 40, 10);

main_loop = new Extractor();

$("#run_classify").on('click', function() {
  var args, classify, core_process, onMessage, url;
  onMessage = function(m) {
    var first;
    first = JSON.parse(m);
    return console.log(first);
  };
  url = global.__dirname + "/python/images/test.tif";
  sharp(url).toFormat("png").toBuffer().then(function(output) {
    return ReactDOM.render(React.createElement(ReactImage, {
      data: output
    }), document.getElementById("image"));
  });
  classify = new Talker(onMessage);
  console.log("Running CorePy.py");
  args = [global.__dirname + '/python/CorePy.py', url];
  core_process = child_p("python", args);
  subprocessList.push(core_process);
  core_process.stderr.on('data', function(data) {
    return console.log("stder: " + data);
  });
  core_process.stdout.on('data', function(data) {
    return console.log("stdout: " + data);
  });
  return core_process.on('close', function(code, signal) {
    console.log("CorePy process ended ...");
    return core_process.exitCode = 1;
  });
});
