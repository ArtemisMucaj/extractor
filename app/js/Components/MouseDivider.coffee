class MouseDivider
  constructor: (first_pane, divider, second_pane, @direction,
  @minFirstPane, @minSecondPane) ->
    @first_pane = $(first_pane)
    @divider = $(divider)
    @second_pane = $(second_pane)
    console.log "Creating divider handle"
    # direction can be vertical or horizontal
    # first_pane, divider and second pane must have an absolute
    # position ... we're going to modify their height/width and
    # top/left attributes
    th = @
    @divider.on 'mousedown', (e) ->
      $(document).on 'mousemove', th.action()
    $(document).on 'mouseup', (e) ->
      $(document).off 'mousemove'

  action: () ->
    that = @
    (e) ->
      if that.direction == "vertical"
        percent = ((e.clientY / $(window).height())*100)
      else if that.direction == "horizontal"
        percent = ((e.clientX / $(window).width())*100)
      if percent < that.minFirstPane
        percent = that.minFirstPane
      if percent > 100 - that.minSecondPane
        percent = 100 - that.minSecondPane
      if that.direction == "vertical"
        that.divider.css({"top":percent+"%"})
        that.first_pane.css({"height":percent+"%"})
        that.second_pane.css({"top":percent+"%","height":(100-percent)+"%"})
      if that.direction == "horizontal"
        that.divider.css({"left":percent+"%"})
        that.first_pane.css({"width":percent+"%"})
        that.second_pane.css({"left":percent+"%","width":(100-percent)+"%"})

module.exports = MouseDivider
