var Converter;

Converter = (function() {
  function Converter() {}

  Converter.low_res;

  Converter.mid_res;

  Converter.high_res;

  Converter.prototype.worker = function() {
    return PDFJS.getDocument(FileHandle.filepath).then(function(pdf) {
      var file_count, nPages, progress_bar;
      nPages = pdf.numPages;
      progress_bar = new ProgressBar(".progress", nPages * 3);
      progress_bar.update = setInterval(function() {
        return glob(global.__dirname + "/data/" + FileHandle.filename + "/**/*.png", function(err, files) {
          console.log(files.length);
          return progress_bar.compute_and_set(files.length);
        });
      }, 200);
      file_count = glob.sync(global.__dirname + "/data/" + FileHandle.filename + "/**/*.png").length;
      if (file_count === progress_bar.max) {
        return PickTrainingExamples.auto();
      } else {
        Converter.low_res = child_p("pdftoppm", ConversionHelper.pdftoppm_low_res_req());
        Converter.low_res.on('close', function(code) {
          console.log('low resolution conversion just finished');
          return PickTrainingExamples.auto();
        });
        Converter.mid_res = child_p("pdftoppm", ConversionHelper.pdftoppm_mid_res_req());
        return Converter.high_res = child_p("pdftoppm", ConversionHelper.pdftoppm_high_res_req());
      }
    }).then(function() {});
  };

  return Converter;

})();

module.exports = Converter;
