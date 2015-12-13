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
  var args, classify, core_process, image, onMessage, url;
  url = global.__dirname + "/python/images/test.tif";
  image = sharp(url);
  image.toFormat("png").toBuffer().then(function(output) {
    return image.metadata().then(function(meta) {
      var height, width;
      width = meta.width;
      height = meta.height;
      return ReactDOM.render(React.createElement(ReactImage, {
        data: output,
        height: height,
        width: width
      }), document.getElementById("image"));
    });
  });
  onMessage = function(message) {
    var canvas_layer, ctx, msg;
    msg = message.toString();
    msg = JSON.parse(msg);
    canvas_layer = $("#canvasLayer");
    ctx = canvas_layer[0].getContext("2d");
    return msg["data"].forEach(function(elt) {
      var bot, height, top, width;
      top = elt["pos"][0];
      bot = elt["pos"][1];
      width = bot["x"] - top["x"];
      height = bot["y"] - top["y"];
      return ctx.strokeRect(top["x"], top["y"], width, height);
    });
  };
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
    core_process.exitCode = 1;
    return classify.close();
  });
});
