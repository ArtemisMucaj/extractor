var Converter;

Converter = (function() {
  function Converter() {}

  Converter.prototype.worker = function() {
    var that;
    that = this;
    return PDFJS.getDocument(FileHandle.filepath).then(function(pdf) {
      var args, file_count, folder_path, nPages, progress_bar, subprocess;
      nPages = pdf.numPages;
      folder_path = global.__dirname + "/data/" + FileHandle.encodedName;
      progress_bar = new ProgressBar(".progress", nPages * 2);
      progress_bar.update = setInterval(function() {
        return glob(folder_path + "/**/*.tif", function(err, files) {
          return progress_bar.compute_and_set(files.length);
        });
      }, 200);
      file_count = glob.sync(folder_path + "/**/*.tif").length;
      console.log(file_count);
      if (file_count === progress_bar.max) {
        return PickTrainingExamples.auto(folder_path + "/20x20/");
      } else {
        args = ConversionHelper.ScaleRequest(20, 20, folder_path);
        subprocess = child_p("pdftoppm", args);
        subprocessList.push(subprocess);
        subprocess.on('close', function(code) {
          return subprocess.exitCode = 1;
        });
        args = ConversionHelper.ScaleRequest(500, 500, folder_path);
        subprocess = child_p("pdftoppm", args);
        subprocessList.push(subprocess);
        return subprocess.on('close', function(code) {
          subprocess.exitCode = 1;
          return PickTrainingExamples.auto(folder_path + "/20x20/");
        });
      }
    });
  };

  return Converter;

})();

module.exports = Converter;
