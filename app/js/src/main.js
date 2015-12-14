var ConversionHelper, Converter, Dialog, DragDrop, Extractor, FileHandle, FilePick, Helper, ProgressBar, React, ReactDOM, ReactFileButton, ReactFileSelectorLayout, ReactImage, ReactImageList, ReactProgressBar, ReactProgressBarLayout, Remote, ResizeableDivider, TEPicker, Talk, Train, child_p, fs, glob, main_loop, os, pdfjs, process, resizeablePane, sharp, subprocessList, zmq;

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

Talk = require('../app/js/src/Components/Talk');

TEPicker = require('../app/js/src/Components/TEPicker');

Train = require('../app/js/src/Components/Train');

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

$("#run_classify").on('click', function() {
  var toggle_tabs;
  Train.run();
  $("#validate_classification")[0].className = "button hollow";
  toggle_tabs = new Foundation.Tabs($(".tabs"));
  return toggle_tabs.selectTab($("#details"));
});

main_loop = new Extractor();
