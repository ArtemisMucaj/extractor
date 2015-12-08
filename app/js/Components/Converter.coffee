# Converter class :
class Converter
  # statical attributes
  @low_res
  @mid_res
  @high_res
  # do things here
  worker : () ->
    PDFJS.getDocument(FileHandle.filepath).then (pdf) ->
      nPages = pdf.numPages
      # before running pdftoppm : check if data exists
      Converter.low_res = child_p("pdftoppm",
       ConversionHelper.pdftoppm_low_res_req())
      Converter.mid_res = child_p("pdftoppm",
       ConversionHelper.pdftoppm_mid_res_req())
      Converter.high_res = child_p("pdftoppm",
       ConversionHelper.pdftoppm_high_res_req())
      # Handle progress
      progress_bar = new ProgressBar(".progress",nPages*3)
      progress_bar.update = setInterval ->
        # Check for progression
        glob global.__dirname+"/data/"+FileHandle.filename+
              "/**/*.png", (err, files) ->
                console.log files.length
                progress_bar.compute_and_set(files.length)
      , 200
      console.log progress_bar
    .then ->
      Converter.low_res.on 'close', (code) ->
        console.log('low resolution conversion just finished')
        Converter.low_res = "finished"
      Converter.mid_res.on 'close', (code) ->
        console.log('mid resolution conversion just finished')
        Converter.mid_res = "finished"
      Converter.high_res.on 'close', (code) ->
        console.log('high resolution conversion just finished')
        Converter.high_res = "finished"

module.exports = Converter
