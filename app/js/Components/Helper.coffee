class Helper

  @killSubProcessesOnExit: (processList) ->
    process.on 'exit', () ->
      process.stdout.write("\n Closing application - It's time to kill
      child processes \n")
      Helper.killSubProcesses(processList)
      process.stdout.write("We're just doing some clean-up
       ... and it's done! \n")

  @killSubProcesses: (processList) ->
    for elt in processList
      if elt.exitCode == null
        elt.kill()


module.exports = Helper
