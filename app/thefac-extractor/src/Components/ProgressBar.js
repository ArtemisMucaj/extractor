var ProgressBar;

ProgressBar = (function() {
  function ProgressBar(progress_bar, max) {
    this.progress_bar = progress_bar;
    this.max = max;
    this.update;
  }

  ProgressBar.prototype.compute_and_set = function(val) {
    var percent;
    percent = (val * 100) / this.max;
    $(this.progress_bar + "-meter").width(percent + '%');
    $(this.progress_bar + "-meter-text").text(parseInt(percent) + '%');
    if (percent >= 100) {
      return clearInterval(this.update);
    }
  };

  return ProgressBar;

})();

module.exports = ProgressBar;
