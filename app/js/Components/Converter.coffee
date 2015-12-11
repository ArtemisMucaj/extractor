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
      # Handle progress
      progress_bar = new ProgressBar(".progress",nPages*3)
      # set update
      progress_bar.update = setInterval ->
        # Check for progression
        glob global.__dirname+"/data/"+FileHandle.filename+
              "/**/*.png", (err, files) ->
                console.log files.length
                progress_bar.compute_and_set(files.length)
      , 200

      file_count = glob.sync global.__dirname+"/data/"+FileHandle.filename+
        "/**/*.png"
        .length

      if file_count == progress_bar.max
        # run autopicker
        PickTrainingExamples.auto()
      else
        Converter.low_res = child_p("pdftoppm",
         ConversionHelper.pdftoppm_low_res_req())
        Converter.low_res.on 'close', (code) ->
          console.log('low resolution conversion just finished')
          PickTrainingExamples.auto()
        Converter.mid_res = child_p("pdftoppm",
          ConversionHelper.pdftoppm_mid_res_req())
        Converter.high_res = child_p("pdftoppm",
         ConversionHelper.pdftoppm_high_res_req())
    .then ->
      #Converter.mid_res.on 'close', (code) ->
      #  console.log('mid resolution conversion just finished')
      #Converter.high_res.on 'close', (code) ->
      #  console.log('high resolution conversion just finished')

module.exports = Converter
