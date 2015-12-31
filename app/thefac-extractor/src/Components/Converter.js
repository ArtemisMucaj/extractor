var Converter;

Converter = (function() {
  function Converter() {}

  Converter.worker = function() {
    var info, that;
    that = this;
    info = PDF(FileHandle.filepath);
    return info.info(function(err, meta) {
      var args, file_count, folder_path, nPages, progress_bar, subprocess;
      if (err) {
        throw err;
      }
      nPages = meta["pages"];
      folder_path = global.__dirname + "/../data/" + FileHandle.encodedName;
      progress_bar = new ProgressBar(".progress", nPages * 2);
      progress_bar.update = setInterval(function() {
        return glob(folder_path + "/**/*.tif", function(err, files) {
          return progress_bar.compute_and_set(files.length);
        });
      }, 200);
      file_count = glob.sync(folder_path + "/**/*.tif").length;
      if (file_count === progress_bar.max) {
        TEPicker.auto(folder_path + "/20x20/");
        return $("#run_autopick").on('click', function() {
          return TEPicker.auto(folder_path + "/20x20/");
        });
      } else {
        args = ConversionHelper.ScaleRequest(20, 20, folder_path);
        subprocess = child_p("pdftoppm", args);
        subprocessList.push(subprocess);
        subprocess.on('close', function(code) {
          return subprocess.exitCode = 1;
        });
        args = ConversionHelper.PPIRequest(50, folder_path, "raw");
        subprocess = child_p("pdftoppm", args);
        subprocessList.push(subprocess);
        return subprocess.on('close', function(code) {
          subprocess.exitCode = 1;
          TEPicker.auto(folder_path + "/20x20/");
          return $("#run_autopick").on('click', function() {
            return TEPicker.auto(folder_path + "/20x20/");
          });
        });
      }
    });
  };

  return Converter;

})();

module.exports = Converter;
