var ResizeableDivider;

ResizeableDivider = (function() {
  function ResizeableDivider(first_pane, divider, second_pane, direction, minFirstPane, minSecondPane) {
    var th;
    this.direction = direction;
    this.minFirstPane = minFirstPane;
    this.minSecondPane = minSecondPane;
    this.first_pane = $(first_pane);
    this.divider = $(divider);
    this.second_pane = $(second_pane);
    th = this;
    this.divider.on('mousedown', function(e) {
      return $(document).on('mousemove', th.action());
    });
    $(document).on('mouseup', function(e) {
      return $(document).off('mousemove');
    });
  }

  ResizeableDivider.prototype.action = function() {
    var that;
    that = this;
    return function(e) {
      var percent;
      if (that.direction === "vertical") {
        percent = (e.clientY / $(window).height()) * 100;
      } else if (that.direction === "horizontal") {
        percent = (e.clientX / $(window).width()) * 100;
      }
      if (percent < that.minFirstPane) {
        percent = that.minFirstPane;
      }
      if (percent > 100 - that.minSecondPane) {
        percent = 100 - that.minSecondPane;
      }
      if (that.direction === "vertical") {
        that.divider.css({
          "top": percent + "%"
        });
        that.first_pane.css({
          "height": percent + "%"
        });
        that.second_pane.css({
          "top": percent + "%",
          "height": (100 - percent) + "%"
        });
      }
      if (that.direction === "horizontal") {
        that.divider.css({
          "left": percent + "%"
        });
        that.first_pane.css({
          "width": percent + "%"
        });
        return that.second_pane.css({
          "left": percent + "%",
          "width": (100 - percent) + "%"
        });
      }
    };
  };

  return ResizeableDivider;

})();

module.exports = ResizeableDivider;
