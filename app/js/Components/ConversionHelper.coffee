# ConversionHelper class :
class ConversionHelper
  # make a new directory
  @mkdir : (path) ->
    child_p("mkdir", ["-p", path])

  # return pdftoppm requests :
  @pdftoppm_low_res_req : () ->
    path = global.__dirname+"/data/"+FileHandle.filename+"/low/"
    ConversionHelper.mkdir(path)
    return ['-scale-to-x', '20', '-scale-to-y', '20', '-png',
            FileHandle.filepath, path]

  @pdftoppm_mid_res_req : () ->
    path = global.__dirname+"/data/"+FileHandle.filename+"/mid/"
    ConversionHelper.mkdir(path)
    return ['-scale-to-x', '500', '-scale-to-y', '500', '-png',
            FileHandle.filepath, path]

  @pdftoppm_high_res_req : () ->
    path = global.__dirname+"/data/"+FileHandle.filename+"/high/"
    ConversionHelper.mkdir(path)
    return ['-r', '150', '-png',
            FileHandle.filepath, path]

module.exports = ConversionHelper
