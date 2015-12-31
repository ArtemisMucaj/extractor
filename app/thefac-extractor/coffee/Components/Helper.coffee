class Helper

  @killSubProcessesOnExit: (processList) ->
    process.on 'exit', () ->
      process.stdout.write("\nClosing application - It's time to kill
      child processes \n")
      Helper.killSubProcesses(processList)
      process.stdout.write("We're just doing some clean-up
       ... and it's done! \n")

  @killSubProcesses: (processList) ->
    console.log "Killing subprocesses ..."
    for elt in processList
      if elt.exitCode == null
        elt.kill()


module.exports = Helper
