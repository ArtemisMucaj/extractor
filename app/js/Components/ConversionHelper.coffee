# ConversionHelper class :
class ConversionHelper
  # make a new directory
  @mkdir : (path) ->
    child_p("mkdir", ["-p", path])

  @ScaleRequest: (x, y, p) ->
    path = p+"/"+x+"x"+y+"/"
    ConversionHelper.mkdir(path)
    return ['-scale-to-x', x, '-scale-to-y', y, '-tiff',
            FileHandle.filepath, path]

  @PPIRequest: (ppi,p) ->
    path = p+"/"+ppi+"/"
    ConversionHelper.mkdir(path)
    return ['-r', ppi, '-tiff',
            FileHandle.filepath, path]


module.exports = ConversionHelper
