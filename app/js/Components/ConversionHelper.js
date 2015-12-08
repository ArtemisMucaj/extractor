var ConversionHelper;

ConversionHelper = (function() {
  function ConversionHelper() {}

  ConversionHelper.mkdir = function(path) {
    return child_p("mkdir", ["-p", path]);
  };

  ConversionHelper.pdftoppm_low_res_req = function() {
    var path;
    path = global.__dirname + "/data/" + FileHandle.filename + "/low/";
    ConversionHelper.mkdir(path);
    return ['-scale-to-x', '20', '-scale-to-y', '20', '-png', FileHandle.filepath, path];
  };

  ConversionHelper.pdftoppm_mid_res_req = function() {
    var path;
    path = global.__dirname + "/data/" + FileHandle.filename + "/mid/";
    ConversionHelper.mkdir(path);
    return ['-scale-to-x', '500', '-scale-to-y', '500', '-png', FileHandle.filepath, path];
  };

  ConversionHelper.pdftoppm_high_res_req = function() {
    var path;
    path = global.__dirname + "/data/" + FileHandle.filename + "/high/";
    ConversionHelper.mkdir(path);
    return ['-r', '150', '-png', FileHandle.filepath, path];
  };

  return ConversionHelper;

})();

module.exports = ConversionHelper;
