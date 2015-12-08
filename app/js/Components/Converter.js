var Converter;

Converter = (function() {
  function Converter() {}

  Converter.low_res;

  Converter.mid_res;

  Converter.high_res;

  Converter.prototype.worker = function() {
    return PDFJS.getDocument(FileHandle.filepath).then(function(pdf) {
      var nPages, progress_bar;
      nPages = pdf.numPages;
      Converter.low_res = child_p("pdftoppm", ConversionHelper.pdftoppm_low_res_req());
      Converter.mid_res = child_p("pdftoppm", ConversionHelper.pdftoppm_mid_res_req());
      Converter.high_res = child_p("pdftoppm", ConversionHelper.pdftoppm_high_res_req());
      progress_bar = new ProgressBar(".progress", nPages * 3);
      progress_bar.update = setInterval(function() {
        return glob(global.__dirname + "/data/" + FileHandle.filename + "/**/*.png", function(err, files) {
          console.log(files.length);
          return progress_bar.compute_and_set(files.length);
        });
      }, 200);
      return console.log(progress_bar);
    }).then(function() {
      Converter.low_res.on('close', function(code) {
        console.log('low resolution conversion just finished');
        return Converter.low_res = "finished";
      });
      Converter.mid_res.on('close', function(code) {
        console.log('mid resolution conversion just finished');
        return Converter.mid_res = "finished";
      });
      return Converter.high_res.on('close', function(code) {
        console.log('high resolution conversion just finished');
        return Converter.high_res = "finished";
      });
    });
  };

  return Converter;

})();

module.exports = Converter;
