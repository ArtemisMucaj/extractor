var Helper;

Helper = (function() {
  function Helper() {}

  Helper.killSubProcesses = function(processList) {
    return process.on('exit', function() {
      var elt, i, len;
      process.stdout.write("Closing application - It's time to kill child processes \n");
      for (i = 0, len = processList.length; i < len; i++) {
        elt = processList[i];
        if (elt.exitCode === null) {
          elt.kill();
        }
      }
      return process.stdout.write("We're just doing some clean-up ... and it's done! \n");
    });
  };

  return Helper;

})();

module.exports = Helper;
