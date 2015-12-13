var Autopick, ConversionHelper, Converter, Dialog, DragDrop, Extractor, FileHandle, FilePick, Helper, ProgressBar, React, ReactDOM, ReactFileButton, ReactFileSelectorLayout, ReactImageList, ReactProgressBar, ReactProgressBarLayout, Remote, ResizeableDivider, TEPicker, child_p, fs, glob, main_loop, os, pdfjs, process, resizeablePane, sharp, subprocessList, zmq;

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

ReactImageList = require("../app/js/src/ReactComponents/" + "ImageList");

Helper = require('../app/js/src/Components/Helper');

Autopick = require('../app/js/src/Components/Autopick');

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
