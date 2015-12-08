var ConversionHelper, Converter, Dialog, DragDrop, FileHandle, FilePick, ProgressBar, React, ReactDOM, ReactFileButton, ReactFileSelectorLayout, ReactProgressBar, ReactProgressBarLayout, Remote, child_p, fs, glob, os, pdfjs, picker;

DragDrop = require('drag-drop');

Remote = require('remote');

Dialog = Remote.require('dialog');

pdfjs = require('pdfjs-dist/build/pdf.combined');

glob = require('glob');

child_p = require('child_process').spawn;

fs = require('fs');

os = require('os');

React = require('react');

ReactDOM = require('react-dom');

ReactFileButton = require("../app/js/ReactComponents/FileButton");

ReactProgressBar = require("../app/js/ReactComponents/ProgressBar");

ReactFileSelectorLayout = require("../app/js/ReactComponents/" + "FileSelectorLayout");

ReactProgressBarLayout = require("../app/js/ReactComponents/" + "ProgressBarLayout");

ProgressBar = require('../app/js/Components/ProgressBar');

FilePick = require('../app/js/Components/FilePick');

ConversionHelper = require('../app/js/Components/ConversionHelper');

Converter = require('../app/js/Components/Converter');

FileHandle = require('../app/js/Components/FileHandle');

picker = new FileHandle("body", "#btn-file-pick");
