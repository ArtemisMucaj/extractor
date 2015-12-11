class Helper
  @killSubProcesses: (processList) ->
    process.on 'exit', () ->
      process.stdout.write("Closing application - It's time to kill
      child processes \n")
      for elt in processList
        if elt.exitCode == null
          elt.kill()
      process.stdout.write("We're just doing some clean-up
       ... and it's done! \n")
       
module.exports = Helper
