var ConversionHelper;

ConversionHelper = (function() {
  function ConversionHelper() {}

  ConversionHelper.mkdir = function(path) {
    return child_p("mkdir", ["-p", path]);
  };

  ConversionHelper.ScaleRequest = function(x, y, p) {
    var path;
    path = p + "/" + x + "x" + y + "/";
    ConversionHelper.mkdir(path);
    return ['-scale-to-x', x, '-scale-to-y', y, '-tiff', FileHandle.filepath, path];
  };

  ConversionHelper.PPIRequest = function(ppi, p, folder) {
    var path;
    path = p + "/" + folder + "/";
    ConversionHelper.mkdir(path);
    return ['-r', ppi, '-tiff', FileHandle.filepath, path];
  };

  return ConversionHelper;

})();

module.exports = ConversionHelper;
