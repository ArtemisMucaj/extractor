# Converter class :
class Converter
  # do things here
  @worker : () ->
    that = @
    # Get pdf's metadata ...
    info = PDF(FileHandle.filepath)
    info.info (err,meta) ->
      if (err)
        throw err
      nPages = meta["pages"]
      folder_path = global.__dirname+"/../data/"+FileHandle.encodedName
      # Handle progress
      progress_bar = new ProgressBar(".progress",nPages*2)
      # set update
      progress_bar.update = setInterval ->
        # Check for progression
        glob folder_path+
              "/**/*.tif", (err, files) ->
                progress_bar.compute_and_set(files.length)
      , 200

      file_count = glob.sync folder_path+
        "/**/*.tif"
        .length

      if file_count == progress_bar.max
        # run autopicker
        TEPicker.auto(folder_path+"/20x20/")
        $("#run_autopick").on 'click', () ->
          TEPicker.auto(folder_path+"/20x20/")
      else
        # Low resolution conversion
        args = ConversionHelper.ScaleRequest(20,20,folder_path)
        subprocess = child_p("pdftoppm", args)
        subprocessList.push subprocess
        subprocess.on 'close', (code) ->
          subprocess.exitCode = 1
        # Better resolution conversion
        args = ConversionHelper.PPIRequest(50,folder_path,"raw")
        subprocess = child_p("pdftoppm", args)
        subprocessList.push subprocess
        # Autopick
        subprocess.on 'close', (code) ->
          subprocess.exitCode = 1
          # Run autopicker
          TEPicker.auto(folder_path+"/20x20/")
          $("#run_autopick").on 'click', () ->
            TEPicker.auto(folder_path+"/20x20/")


module.exports = Converter
