var Helper;

Helper = (function() {
  function Helper() {}

  Helper.killSubProcessesOnExit = function(processList) {
    return process.on('exit', function() {
      process.stdout.write("\nClosing application - It's time to kill child processes \n");
      Helper.killSubProcesses(processList);
      return process.stdout.write("We're just doing some clean-up ... and it's done! \n");
    });
  };

  Helper.killSubProcesses = function(processList) {
    var elt, i, len, results;
    results = [];
    for (i = 0, len = processList.length; i < len; i++) {
      elt = processList[i];
      if (elt.exitCode === null) {
        results.push(elt.kill());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return Helper;

})();

module.exports = Helper;
