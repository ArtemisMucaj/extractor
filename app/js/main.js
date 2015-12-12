var Autopick, ConversionHelper, Converter, Dialog, DragDrop, Extractor, FileHandle, FilePick, Helper, PickTrainingExamples, ProgressBar, React, ReactDOM, ReactFileButton, ReactFileSelectorLayout, ReactImageList, ReactProgressBar, ReactProgressBarLayout, Remote, child_p, fs, glob, main_loop, os, pdfjs, process, sharp, subprocessList, zmq;

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

ReactFileButton = require("../app/js/ReactComponents/FileButton");

ReactProgressBar = require("../app/js/ReactComponents/ProgressBar");

ReactFileSelectorLayout = require("../app/js/ReactComponents/" + "FileSelectorLayout");

ReactProgressBarLayout = require("../app/js/ReactComponents/" + "ProgressBarLayout");

ReactImageList = require("../app/js/ReactComponents/" + "ImageList");

Helper = require('../app/js/Components/Helper');

Autopick = require('../app/js/Components/Autopick');

PickTrainingExamples = require('../app/js/Components/PickTrainingExamples');

ProgressBar = require('../app/js/Components/ProgressBar');

FilePick = require('../app/js/Components/FilePick');

ConversionHelper = require('../app/js/Components/ConversionHelper');

Converter = require('../app/js/Components/Converter');

FileHandle = require('../app/js/Components/FileHandle');

Extractor = require('../app/js/Extractor');

subprocessList = [];

Helper.killSubProcessesOnExit(subprocessList);

main_loop = new Extractor();
